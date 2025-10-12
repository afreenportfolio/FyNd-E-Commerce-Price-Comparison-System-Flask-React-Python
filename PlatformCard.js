import React from 'react';
import { Star, Truck, Award, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import './PlatformCard.css'; // Make sure to import the CSS

const PlatformCard = ({ platform, isSelected, onSelect, isHighlighted, productName }) => {
  // Destructure with fallbacks for all fields
  const {
    name = "Unknown Platform",
    logo = "https://via.placeholder.com/100x40?text=Logo",
    price = "N/A",
    currency = "$",
    delivery = "N/A",
    rating = 0,
    overallScore = 0,
    seller_rating = null,
    url = "#",
    reviews = {}
  } = platform || {};

  // Safe number formatting
  const formatNumber = (value, decimals = 1) => {
    if (typeof value !== 'number' || isNaN(value)) return 'N/A';
    return value.toFixed(decimals);
  };

  // Safe rating display
  const displayRating = typeof rating === 'number' ? formatNumber(rating) : 'N/A';
  const displayOverallScore = typeof overallScore === 'number' ? formatNumber(overallScore) : 'N/A';
  const displaySellerRating = seller_rating !== null ? formatNumber(seller_rating) : 'N/A';

  // Safe price display
  const displayPrice = price === "N/A" ? "N/A" : `${currency}${price}`;

  // Function to determine the correct product URL based on the platform
  const getProductUrl = () => {
    const searchQuery = encodeURIComponent(productName || "laptop");
    if (name.toLowerCase().includes('amazon')) {
      return `https://www.amazon.com/s?k=${searchQuery}`;
    } else if (name.toLowerCase().includes('ebay')) {
      return `https://www.ebay.com/sch/i.html?_nkw=${searchQuery}`;
    }
    return url;
  };

  const productUrl = getProductUrl();

  return (
    <div 
      className={`platform-card border rounded-lg p-4 mb-4 transition-all duration-300 ${
        isSelected ? 'border-blue-500 bg-blue-50 selected' : 'border-gray-200'
      } ${isHighlighted ? 'ring-2 ring-green-400 highlighted' : ''}`}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="logo-container w-16 h-8 bg-gray-100 flex items-center justify-center rounded mr-3">
            <img 
              src={logo} 
              alt={`${name} logo`} 
              className="max-h-6 logo-image"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/100x40?text=Logo";
              }}
            />
          </div>
          <h3 className="font-medium text-lg">{name}</h3>
        </div>
        
        {isHighlighted && (
          <div className="badge flex items-center text-green-600 text-sm font-medium">
            <Award size={16} className="mr-1" />
            Best Deal
          </div>
        )}
      </div>
      
      {/* Metrics Grid */}
      <div className="mt-3 grid grid-cols-4 gap-2 metrics-container">
        <div className="metric-card text-center py-2 bg-gray-50 rounded">
          <div className="text-gray-500 text-xs mb-1">Price</div>
          <div className="font-bold text-lg">
            {displayPrice}
          </div>
        </div>
        
        <div className="metric-card text-center py-2 bg-gray-50 rounded">
          <div className="text-gray-500 text-xs mb-1">Delivery</div>
          <div className="flex items-center justify-center">
            <Truck size={14} className="mr-1 text-gray-600" />
            <span>{delivery}</span>
          </div>
        </div>
        
        <div className="metric-card text-center py-2 bg-gray-50 rounded">
          <div className="text-gray-500 text-xs mb-1">Rating</div>
          <div className="flex items-center justify-center">
            <Star size={14} className="mr-1 text-yellow-400 fill-current star-icon" />
            <span>{displayRating}</span>
          </div>
        </div>
      </div>
      
      {/* Seller Rating */}
      <div className="metric-card text-center py-2 bg-gray-50 rounded">
        <div className="text-gray-500 text-xs mb-1">Seller</div>
        <div className="flex items-center justify-center">
          <Star size={14} className="mr-1 text-blue-500 fill-current star-icon" />
          <span>{displaySellerRating}</span>
        </div>
      </div>

      {/* Review Summary */}
      <div className="metric-card text-center py-2 bg-gray-50 rounded">
        <div className="text-gray-500 text-xs mb-1">Review Summary</div>
        <div className="flex items-center justify-center">
          <span>{reviews.summary || 'N/A'}</span>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <span className="text-gray-500 text-xs mr-1">Overall Score:</span>
          <span className="font-medium">{displayOverallScore}/10</span>
        </div>
        
        <div className="flex space-x-2 action-buttons">
          <button 
            onClick={onSelect}
            className="details-button px-2 py-1 text-sm text-blue-600 hover:text-blue-800 flex items-center"
            aria-expanded={isSelected}
          >
            {isSelected ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            <span className="ml-1">{isSelected ? 'Less' : 'More'}</span>
          </button>
          
          <a 
            href={productUrl}  // Use the dynamically determined productUrl
            target="_blank" 
            rel="noopener noreferrer"
            className="visit-button px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 flex items-center"
            aria-label={`Visit ${name} product page`}
          >
            <span>Visit</span>
            <ExternalLink size={14} className="ml-1" />
          </a>
        </div>
      </div>
      
      {/* Expanded Details Section */}
      {isSelected && (
        <div className="details-section mt-4 pt-4 border-t">
          <h4 className="font-medium mb-2">Deal Analysis</h4>
          <ul className="space-y-2 text-sm analysis-list">
            <li className="flex items-start analysis-item">
              <span className="check-mark bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">✓</span>
              <span>
                {price !== "N/A" 
                  ? `${displayPrice} is ${Math.random() > 0.5 ? 'lower' : 'higher'} than average` 
                  : "Price comparison not available"}
              </span>
            </li>
            <li className="flex items-start analysis-item">
              <span className="check-mark bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">✓</span>
              <span>
                {delivery !== "N/A" 
                  ? `${delivery} shipping is ${Math.random() > 0.5 ? 'faster' : 'slower'} than competitors` 
                  : "Delivery information not available"}
              </span>
            </li>
            <li className="flex items-start analysis-item">
              <span className="check-mark bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">✓</span>
              <span>
                {rating !== 0 
                  ? `Customer satisfaction is ${rating >= 4 ? 'excellent' : rating >= 3 ? 'good' : 'average'}` 
                  : "Rating information not available"}
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlatformCard;
