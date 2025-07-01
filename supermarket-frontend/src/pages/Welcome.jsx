import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Welcome.css';

function Welcome() {
  const { user } = useAuth();

  return (
    <div className="main-content">
      <div className="welcome-container">
        <h2 className="welcome-heading">Welcome, {user?.name}</h2>
        <p className="welcome-role">
          You are logged in as: <span>{user?.user_type}</span>
        </p>
      </div>
    </div>
  );
}

export default Welcome;
