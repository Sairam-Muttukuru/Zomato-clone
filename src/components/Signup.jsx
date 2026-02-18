import React, { useContext, useState } from "react";
import "../styles/login.css";
import { FaCamera, FaUser, FaEnvelope, FaLock, FaGoogle, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

export default function SignupPage() {
  const [profileImg, setProfileImg] = useState(null); // preview
  const [file, setFile] = useState(null); // actual file

  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setProfileImg(URL.createObjectURL(f)); // preview only
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup form submitted");
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      let image_url = null;

      // 🔥 Upload to Cloudinary (use fetch so no Authorization header is sent)
      if (file) {
        console.log("Starting image upload...");
        const fd = new FormData();
        fd.append("file", file);
        fd.append("upload_preset", "First_project");

        const res = await fetch("https://api.cloudinary.com/v1_1/dghdwtef5/image/upload", {
          method: "POST",
          body: fd,
        });
        if (!res.ok) {
          console.error("Cloudinary error", res.statusText);
          throw new Error("Cloudinary upload failed");
        }
        const data = await res.json();
        image_url = data.secure_url;
        console.log("Image uploaded:", image_url);
      } else {
        console.log("No image file selected.");
      }

      console.log("Calling signup API...");
      const u = await signup(name, email, password, image_url);
      console.log("Signup API success:", u);

      if (u?.name) {
        toast.success(`Welcome, ${u.name}!`);
      }

      if (u?.role === "admin") navigate("/admin/restaurants");
      else navigate("/home/restaurants");

    } catch (err) {
      console.error("Signup error in component:", err);
      setError(err?.message || "Signup failed. Email may already be in use.");
      if (err?.message) toast.error(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-overlay"></div>
      <div className="auth-box">

        {/* Profile Image Upload */}
        <div className="profile-wrapper">
          <div className="profile-pic">
            <img
              id="prof-img"
              src={
                profileImg
                  ? profileImg
                  : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
              }
              alt="Profile"
            />
            <label htmlFor="file-upload" className="camera-icon">
              <FaCamera />
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <h2>Create an Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-with-icon">
            <FaUser className="input-icon" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Username"
              required
            />
          </div>
          <div className="input-with-icon">
            <FaEnvelope className="input-icon" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-with-icon">
            <FaLock className="input-icon" />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="input-with-icon">
            <FaLock className="input-icon" />
            <input
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              type="password"
              placeholder="Confirm password"
              required
            />
          </div>

          {error && <div className="error-msg">{error}</div>}

          <button type="submit" className="auth-btn">Sign Up</button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        <div className="social-login">
          <button className="social-btn google"><FaGoogle /> Google</button>
          <button className="social-btn facebook"><FaFacebook /> Facebook</button>
        </div>

        <div className="auth-toggle">
          Already have an account? <span onClick={() => navigate("/login")}>Login</span>
        </div>

      </div>
    </div>
  );
}
