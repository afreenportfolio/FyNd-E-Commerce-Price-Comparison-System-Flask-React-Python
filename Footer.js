import React from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <ShoppingBag className="footer-logo-icon" size={24} />
            <span className="text-xl font-bold">FyNd</span>
          </div>
          <p className="footer-description">
            Helping you find the best deals across major e-commerce platforms with AI-powered price comparison and review analysis.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h3>Company</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Team</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3>Support</h3>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>

          <div className="footer-subscribe">
            <h3>Subscribe</h3>
            <p>Get the latest deals and updates</p>
            <div className="footer-input">
              <input type="email" placeholder="Your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-social">
          <a href="#" aria-label="Facebook">📘</a>
          <a href="#" aria-label="Instagram">📸</a>
          <a href="#" aria-label="Twitter">🐦</a>
        </div>
        <p className="footer-copyright">
          © 2025 FyNd. All rights reserved. Made with <Heart size={12} className="inline text-red-500" /> in India
        </p>
      </div>
    </footer>
  );
};

export default Footer;
