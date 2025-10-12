import React from 'react';
import { Clock, X } from 'lucide-react';
import './RecentSearches.css'; // Import the CSS file

const RecentSearches = ({ searches, onSelectSearch, onClearSearch }) => {
  if (!searches || searches.length === 0) return null;
  
  return (
    <div className="recent-searches-container mb-6">
      <div className="flex items-center justify-between mb-2 header-container">
        <h3 className="text-sm font-medium text-gray-700 flex items-center title-container">
          <Clock size={14} className="mr-1 clock-icon" />
          Recent Searches
        </h3>
        <button 
          onClick={() => onClearSearch('all')} 
          className="text-xs text-blue-600 hover:text-blue-800 clear-all-button"
        >
          Clear All
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2 searches-container">
        {searches.map((search, index) => (
          <div 
            key={index} 
            className="search-tag flex items-center bg-gray-100 rounded-full px-3 py-1"
          >
            <button
              onClick={() => onSelectSearch(search)}
              className="text-sm text-gray-700 hover:text-gray-900 search-text"
            >
              {search}
            </button>
            <button
              onClick={() => onClearSearch(index)}
              className="ml-1 text-gray-400 hover:text-gray-600 delete-button"
            >
              <X size={14} className="x-icon" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;