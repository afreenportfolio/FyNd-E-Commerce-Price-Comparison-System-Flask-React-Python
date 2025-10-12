import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <h2>About Us</h2>
      <p className="subtitle">
        Welcome to <strong>FyNd</strong>, your ultimate destination for smart and informed online shopping!
      </p>
      <div className="about-content">
        <div className="about-section">
          <h3>Our Mission</h3>
          <p>
            At FyNd, our mission is to simplify your online shopping experience. We help you find the best deals by comparing products across top eCommerce platforms like Amazon, Flipkart, and eBay. Our goal is to save you time and money while ensuring you get the best value for your purchase.
          </p>
        </div>
        <div className="about-section">
          <h3>How We Do It</h3>
          <p>
            Using advanced web scraping and AI-powered analysis, we gather real-time data on product prices, specifications, and customer reviews. Our system then compares this data to provide you with a comprehensive overview, helping you make informed decisions.
          </p>
        </div>
        <div className="about-section">
          <h3>Why Choose Us?</h3>
          <p>
            FyNd stands out because of our commitment to accuracy, transparency, and user satisfaction. We prioritize your needs and ensure that our recommendations are unbiased and data-driven. Whether you're shopping for electronics, fashion, or home essentials, we’ve got you covered.
          </p>
        </div>
      </div>
      <div className="team-section">
        <h3>Meet Our Team</h3>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-photo"></div>
            <h4>Kevin Skariah</h4>
            <p>R6A42</p>
          </div>
          <div className="team-member">
            <div className="member-photo"></div>
            <h4>Nithin M</h4>
            <p>R6A75</p>
          </div>
          <div className="team-member">
            <div className="member-photo"></div>
            <h4>Afreen Suddheer</h4>
            <p>R6A10</p>
          </div>
          <div className="team-member">
            <div className="member-photo"></div>
            <h4>Shinaz Faizal</h4>
            <p>R6A73</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;