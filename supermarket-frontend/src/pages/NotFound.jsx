// src/pages/NotFound.jsx
import React from 'react';
import '../styles/NotFound.css';

function NotFound() {
  return (
    <div className="notfound-container">
      <h2 className="notfound-title">404 - Page Not Found</h2>
      <p className="notfound-message">The page you’re looking for doesn’t exist.</p>
    </div>
  );
}

export default NotFound;
