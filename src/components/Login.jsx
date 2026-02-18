import React, { useContext, useState } from "react";
import "../styles/login.css";
import { FaCamera, FaEnvelope, FaLock, FaUser, FaGoogle, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [profileImg, setProfileImg] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImg(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!isLogin) {
      // If user toggled to Sign Up, send them to dedicated signup page
      return navigate('/signup');
    }
    try {
      const u = await login(email, password);
      if (u?.name) {
        toast.success(`Welcome back, ${u.name}!`);
      }
      if (u?.role === 'admin') navigate('/admin/restaurants');
      else navigate('/home/restaurants');
    } catch (err) {
      setError(err?.message || 'Invalid email or password');
      if (err?.message) toast.error(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-overlay"></div>
      <div className="auth-box">
        {/* Profile Image Upload */}
        {!isLogin && (
          <div className="profile-wrapper">
            <div className="profile-pic">
              <img
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
        )}

        <h2>{isLogin ? "Login to Zomato" : "Create Account"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="input-with-icon">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-with-icon">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {!isLogin && (
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          {isLogin && (
            <div className="forgot-password-link" onClick={() => navigate('/forgot-password')}>
              Forgot Password?
            </div>
          )}

          {error && <div className="error-msg">{error}</div>}

          <button type="submit" className="auth-btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        <div className="social-login">
          <button className="social-btn google"><FaGoogle /> Google</button>
          <button className="social-btn facebook"><FaFacebook /> Facebook</button>
        </div>

        <div className="auth-toggle">
          {isLogin ? "New to Zomato?" : "Already present?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Create account" : "Log in"}
          </span>
        </div>
      </div>
    </div>
  );
}
