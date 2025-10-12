import React from 'react';
import { ShoppingBag, Search } from 'lucide-react';
import './EmptyState.css'; 

const EmptyState = () => {
  return (
    <div className="empty-state">
      <div className="empty-icon-container">
        <ShoppingBag className="empty-icon" />
      </div>
      <h3 className="empty-title">No products to compare yet</h3>
      <p className="empty-subtitle">
        Search for a product to get price comparisons and reviews from multiple e-commerce platforms.
      </p>
      <div className="empty-search-suggestion">
        <Search className="empty-search-icon" />
        <span>Try searching for "iPhone 13" or "Samsung TV"</span>
      </div>
    </div>
  );
};

export default EmptyState;
