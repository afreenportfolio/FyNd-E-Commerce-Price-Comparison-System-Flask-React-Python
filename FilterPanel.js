import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, Star } from 'lucide-react';

const FilterPanel = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    platforms: {
      amazon: true,
      flipkart: true,
      croma: true,
    },
    priceRange: [0, 100000],
    rating: 0,
    sortBy: 'price-asc',
  });

  const handlePlatformChange = (platform) => {
    setFilters({
      ...filters,
      platforms: {
        ...filters.platforms,
        [platform]: !filters.platforms[platform],
      },
    });
  };

  const handleRatingChange = (rating) => {
    setFilters({
      ...filters,
      rating,
    });
  };

  const handleSortChange = (e) => {
    setFilters({
      ...filters,
      sortBy: e.target.value,
    });
  };

  const applyFilters = () => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  };

  return (
    <div className="mb-6 bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 ease-in-out">
      <div
        className="p-4 border-b border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <Filter size={18} className="mr-2 text-gray-600" />
          <span className="font-medium text-gray-800">Filters & Sort</span>
        </div>
        {isOpen ? (
          <ChevronUp size={20} className="text-gray-600 transition-transform duration-200" />
        ) : (
          <ChevronDown size={20} className="text-gray-600 transition-transform duration-200" />
        )}
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Platforms</h4>
              <div className="space-y-2">
                {Object.entries(filters.platforms).map(([platform, isChecked]) => (
                  <label key={platform} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handlePlatformChange(platform)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700 capitalize">{platform}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 mb-2">Minimum Rating</h4>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingChange(star)}
                    className={`p-1 rounded transition-colors duration-200 ${
                      filters.rating >= star
                        ? 'text-yellow-500 hover:text-yellow-600'
                        : 'text-gray-300 hover:text-gray-400'
                    }`}
                  >
                    <Star size={20} fill={filters.rating >= star ? 'currentColor' : 'none'} />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {filters.rating > 0 ? `${filters.rating}+ stars` : 'Any rating'}
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 mb-2">Sort By</h4>
              <select
                value={filters.sortBy}
                onChange={handleSortChange}
                className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highest Rating</option>
                <option value="delivery-asc">Fastest Delivery</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;