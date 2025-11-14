import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ onSearch, clearSearch, searchQuery }) => {
  const [query, setQuery] = useState(searchQuery || '');

  useEffect(() => {
    setQuery(searchQuery || '');
  }, [searchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    clearSearch();
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="relative flex-grow">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a product..."
            className="search-input"
          />
          <Search className="search-icon" size={20} />
          {query && (
            <button type="button" onClick={handleClear} className="clear-icon">
              <X size={20} />
            </button>
          )}
        </div>
        <button type="submit" className="search-button">
          Compare
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
