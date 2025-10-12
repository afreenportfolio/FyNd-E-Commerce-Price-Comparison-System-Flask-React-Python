import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  return (
    <div className="how-it-works">
      <h2>How It Works</h2>
      <p className="subtitle">
        Discover how our eCommerce recommendation system helps you find the best deals in just a few simple steps.
      </p>
      <div className="steps-container">
        <div className="step">
          <div className="step-icon">1</div>
          <h3>Search for a Product</h3>
          <p>
            Enter the name of the product you're looking for in the search bar. Our system supports a wide range of categories, from electronics to fashion.
          </p>
        </div>
        <div className="step">
          <div className="step-icon">2</div>
          <h3>We Fetch Data</h3>
          <p>
            Our advanced web scraping technology gathers real-time data from top eCommerce platforms like Amazon, Flipkart, and eBay.
          </p>
        </div>
        <div className="step">
          <div className="step-icon">3</div>
          <h3>Compare & Analyze</h3>
          <p>
            We compare prices, specifications, and customer reviews to provide you with a detailed analysis of each product.
          </p>
        </div>
        <div className="step">
          <div className="step-icon">4</div>
          <h3>Get Recommendations</h3>
          <p>
            Based on your preferences, we recommend the best website to buy the product, ensuring you get the best value for your money.
          </p>
        </div>
      </div>
      <div className="additional-features">
        <h3>Why Choose Us?</h3>
        <div className="features-grid">
          <div className="feature">
            <span className="feature-icon">💡</span>
            <h4>Smart Recommendations</h4>
            <p>Our system ensures you get the most accurate and relevant recommendations.</p>
          </div>
          <div className="feature">
            <span className="feature-icon">⏱️</span>
            <h4>Save Time</h4>
            <p>No more browsing multiple websites. We bring all the information to one place.</p>
          </div>
          <div className="feature">
            <span className="feature-icon">💰</span>
            <h4>Save Money</h4>
            <p>Find the best deals and discounts across multiple platforms.</p>
          </div>
          <div className="feature">
            <span className="feature-icon">📊</span>
            <h4>Data-Driven Insights</h4>
            <p>Make informed decisions with detailed product comparisons and reviews.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;