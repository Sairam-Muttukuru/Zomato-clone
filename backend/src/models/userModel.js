import pool from "../config/db.js";

export const findUserByEmail = (email) =>
  pool.query("SELECT * FROM users WHERE email=$1", [email]);

export const createUser = (data) =>
  pool.query(
    `INSERT INTO users(name,email,password,role,image_url)
     VALUES($1,$2,$3,$4,$5)
     RETURNING id,name,email,role,image_url`,
    data
  );

export const updateUserOTP = (email, otp, expiry) =>
  pool.query("UPDATE users SET reset_otp=$1, reset_otp_expiry=$2 WHERE email=$3", [otp, expiry, email]);

export const verifyUserOTP = (email) =>
  pool.query("SELECT reset_otp, reset_otp_expiry FROM users WHERE email=$1", [email]);

export const updateUserPassword = (email, hashedPassword) =>
  pool.query("UPDATE users SET password=$1, reset_otp=NULL, reset_otp_expiry=NULL WHERE email=$2", [hashedPassword, email]);
