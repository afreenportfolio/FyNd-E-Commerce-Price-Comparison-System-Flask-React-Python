import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Comparing prices across platforms...</p>
      <p className="loading-subtext">This may take a few moments</p>
    </div>
  );
};

export default Loading;