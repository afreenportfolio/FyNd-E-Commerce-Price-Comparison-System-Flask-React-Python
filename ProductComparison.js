import React, { useState, useEffect } from 'react';
import { Star, Truck, Award, ChevronDown, ChevronUp } from 'lucide-react';
import PlatformCard from './PlatformCard';
import ReviewAnalysis from './ReviewAnalysis';
import './ProductComparison.css';

const ProductComparison = ({ productData }) => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!productData || !productData.platforms || productData.platforms.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        No valid product data available for comparison.
      </div>
    );
  }

  const platforms = productData.platforms || [];
  const sortedPlatforms = [...platforms].sort(
    (a, b) => (b.overallScore || 0) - (a.overallScore || 0)
  );

  const bestPlatform = sortedPlatforms.length > 0 ? sortedPlatforms[0] : {};
  const fastestDeliveryPlatform = sortedPlatforms.sort((a, b) =>
    parseInt(a.delivery || 999) - parseInt(b.delivery || 999)
  )[0] || {};

  const handlePlatformSelect = (platformName) => {
    setSelectedPlatform(platformName === selectedPlatform ? null : platformName);
  };

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  return (
    <div className={`product-comparison bg-white rounded-xl shadow-md overflow-hidden ${isLoaded ? 'loaded' : ''}`}>
      <div className="product-header p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row">
          <div className="product-image md:w-1/3 mb-4 md:mb-0 flex justify-center items-start">
            <img
              src={productData.productImage || 'https://via.placeholder.com/250'}
              alt={productData.productName || 'Product'}
              className="rounded-lg max-h-64 object-contain image-zoom"
            />
          </div>
          <div className="product-details md:w-2/3 md:pl-6">
            <h2 className="product-title text-2xl font-bold text-gray-800 mb-2">
              {productData.productName || 'Product Name'}
            </h2>

            <div className="mb-4">
              <div className="best-deal-badge inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800">
                <Award size={16} className="mr-1 award-icon" />
                <span className="font-medium">Best Deal: {bestPlatform?.name || 'N/A'}</span>
              </div>
            </div>

            <div className="product-stats space-y-2 mb-6">
              <div className="rating-stat flex items-center text-gray-700">
                <Star className="mr-2 text-yellow-500 star-icon" size={18} />
                <span>Rating: {bestPlatform?.rating || 'N/A'}/5</span>
              </div>
              <div className="delivery-stat flex items-center text-gray-700">
                <Truck className="mr-2 text-blue-500 truck-icon" size={18} />
                <span>
                  Fastest Delivery: {fastestDeliveryPlatform.delivery || 'Unknown'} by {
                    fastestDeliveryPlatform.name || 'N/A'
                  }
                </span>
              </div>
            </div>

            <button
              onClick={toggleReviews}
              className="review-toggle flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4"
            >
              {showReviews ? (
                <>
                  <ChevronUp size={20} className="mr-1 chevron-icon" />
                  Hide Review Analysis
                </>
              ) : (
                <>
                  <ChevronDown size={20} className="mr-1 chevron-icon" />
                  Show Review Analysis
                </>
              )}
            </button>

            <div className={`review-analysis-container ${showReviews ? 'show' : 'hide'}`}>
              {showReviews && <ReviewAnalysis platforms={platforms} />}
            </div>
          </div>
        </div>
      </div>

      <div className="comparison-section p-6">
        <h3 className="comparison-title text-lg font-semibold text-gray-800 mb-4">Price Comparison</h3>

        <div className="platforms-grid grid md:grid-cols-3 gap-4">
          {sortedPlatforms.map((platform, index) => (
            <div key={platform.name} className={`platform-card-wrapper item-${index}`}>
              <PlatformCard
                platform={platform}
                productName={productData.productName}
                isSelected={selectedPlatform === platform.name}
                isHighlighted={index === 0}
                onSelect={() => handlePlatformSelect(platform.name)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;
