import React from 'react';

const ErrorMessage = ({ error }) => {
  return (
    <div className="error-container">
      <div className="error-title">
        ⚠️ Oops! Something went wrong
      </div>
      <div className="error-message">
        {error}
      </div>
    </div>
  );
};

export default ErrorMessage;