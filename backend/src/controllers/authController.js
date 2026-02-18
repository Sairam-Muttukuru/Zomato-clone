/* eslint-disable no-undef */
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser, updateUserOTP, verifyUserOTP, updateUserPassword } from "../models/userModel.js";
import { sendOTP } from "../services/emailService.js";

export const signup = async (req, res) => {
  const { name, email, password, role, imageUrl } = req.body;

  const existing = await findUserByEmail(email);
  if (existing.rows.length)
    return res.status(409).json({ error: "Email already exists" });

  const hash = await bcrypt.hash(password, 10);
  const finalRole = email === "bhavanimuttukuru@gmail.com" ? "admin" : (role || "user");

  const result = await createUser([
    name, email, hash, finalRole, imageUrl || null
  ]);

  const user = result.rows[0];
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.status(201).json({ token, user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await findUserByEmail(email);
  if (!result.rows.length)
    return res.status(401).json({ error: "Invalid credentials" });

  const userRow = result.rows[0];
  const ok = await bcrypt.compare(password, userRow.password);
  if (!ok)
    return res.status(401).json({ error: "Invalid credentials" });

  const user = {
    id: userRow.id,
    name: userRow.name,
    email: userRow.email,
    role: userRow.role,
    image_url: userRow.image_url
  };

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user });
};



export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await findUserByEmail(email);
    if (!result.rows.length) return res.status(404).json({ error: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 10 * 60 * 1000; // 10 mins

    await updateUserOTP(email, otp, expiry);
    const sent = await sendOTP(email, otp);

    if (sent) {
      res.json({ message: "OTP sent to your email" });
    } else {
      // Fallback for development if email fails
      console.log(`⚠️ Email service failed. DEV MODE OTP for ${email}: ${otp}`);
      res.json({ message: "OTP generated (Check server console for code)" });
    }
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const result = await verifyUserOTP(email);
  if (!result.rows.length) return res.status(404).json({ error: "User not found" });

  const { reset_otp, reset_otp_expiry } = result.rows[0];

  if (!reset_otp || reset_otp !== otp) {
    return res.status(400).json({ error: "Invalid OTP" });
  }

  if (Date.now() > Number(reset_otp_expiry)) {
    return res.status(400).json({ error: "OTP expired" });
  }

  const hash = await bcrypt.hash(newPassword, 10);
  await updateUserPassword(email, hash);

  res.json({ message: "Password updated successfully" });
};
