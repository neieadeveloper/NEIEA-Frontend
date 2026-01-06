import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const goHome = () => {
    navigate("/");
    window.location.reload(); // force refresh
  };
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          {/* 404 Number with Gradient */}
          <div className="error-number">
            <span className="gradient-text">404</span>
          </div>
          
          {/* Error Message */}
          <div className="error-message">
            <p>The page you are looking for might have been removed, had it's name changed or is temporarily unavailable.</p>
          </div>
          
          {/* Go to Homepage Button */}
          <div className="error-action">
            <Link to="/" className="homepage-btn" onClick={goHome}>
              Go to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
