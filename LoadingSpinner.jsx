import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <div className="loading-text">Getting weather data...</div>
    </div>
  );
};

export default LoadingSpinner;