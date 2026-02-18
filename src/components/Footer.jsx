import React from 'react';
import '../styles/footer.css';
import { FaLinkedin, FaInstagram, FaYoutube, FaXTwitter } from 'react-icons/fa6';
import { FaApple, FaGooglePlay, FaGlobe, FaFlag } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h2 className="footer-logo">zomato</h2>
        <div className="footer-selectors">
          <button className="footer-button">
            <FaFlag className="icon" /> India
          </button>
          <button className="footer-button">
            <FaGlobe className="icon" /> English
          </button>
        </div>
      </div>

      <div className="footer-links">
        <div className="footer-section">
          <h4>ABOUT ZOMATO</h4>
          <ul>
            <li>Who We Are</li>
            <li>Blog</li>
            <li>Work With Us</li>
            <li>Investor Relations</li>
            <li>Report Fraud</li>
            <li>Press Kit</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>ZOMAVERSE</h4>
          <ul>
            <li>Zomato</li>
            <li>Blinkit</li>
            <li>Feeding India</li>
            <li>Hyperpure</li>
            <li>Zomaland</li>
            <li>Zomato Live</li>
            <li>District</li>
            <li>Weather Union</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>FOR RESTAURANTS</h4>
          <ul>
            <li>Partner With Us</li>
            <li>Apps For You</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>LEARN MORE</h4>
          <ul>
            <li>Privacy</li>
            <li>Security</li>
            <li>Terms</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>SOCIAL LINKS</h4>
          <div className="social-icons">
            <FaLinkedin />
            <FaInstagram />
            <FaXTwitter />
            <FaYoutube />
          </div>
        </div>
      </div>

      <hr />
      <div className="footer-bottom">
        <p>
          By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies.
          All trademarks are properties of their respective owners. 2008–2025 © Zomato™ Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
