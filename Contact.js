import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <p className="subtitle">
        Have questions or need assistance? Reach out to us! We're here to help.
      </p>
      <div className="contact-container">
        
        <div className="contact-form">
          <h3>Send Us a Message</h3>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Enter your name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" placeholder="Enter subject" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="Enter your message" rows="5" required></textarea>
            </div>
            <button type="submit" className="submit-btn">
              <span>Send Message</span>
              <i className="btn-icon">→</i>
            </button>
          </form>
        </div>
         
        
        <div className="contact-details">
          <h3>Our Contact Information</h3>
          <div className="details-group">
            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <p>TKM College of Engineering , Kollam , Kerala</p>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📞</span>
              <p>+91 7593880406</p>
            </div>
            <div className="detail-item">
              <span className="detail-icon">✉️</span>
              <p>support@FyNd.com</p>
            </div>
            <div className="detail-item">
              <span className="detail-icon">⏰</span>
              <p>Mon-Sat: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-btn">
              <i className="social-icon">f</i>
              <span>Facebook</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-btn">
              <i className="social-icon">t</i>
              <span>Twitter</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn">
              <i className="social-icon">in</i>
              <span>LinkedIn</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn">
              <i className="social-icon">ig</i>
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>
       
      
      <div className="map-section">
        <h3>Find Us on the Map</h3>
        <div className="map">
          <iframe
            title="ShopSmart Kerala Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.62740474925!2d76.6319375!3d8.914187499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05fd3036020df5%3A0xc3c1007e5232dc27!2sTKM%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1741923199310!5m2!1sen!2sin" 
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;