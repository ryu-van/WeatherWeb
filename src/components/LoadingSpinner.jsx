import React from 'react'

const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="loading-overlay" role="status" aria-live="polite">
      <div className="spinner" />
      <span className="loading-text">{text}</span>
    </div>
  );
}

export default LoadingSpinner;