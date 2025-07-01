import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/welcome" className="nav-link">Home</Link>
        {(user.user_type === 'Manager' || user.user_type === 'Staff') && (
          <Link to="/inventory" className="nav-link">Inventory</Link>
        )}
        {user.user_type === 'Manager' && (
          <Link to="/stat" className="nav-link">Stats</Link>
        )}
        {user.user_type === 'Clerk' && (
          <Link to="/bill" className="nav-link">Billing</Link>
        )}
        <Link to="/profile" className="nav-link">Profile</Link>
        <Link to="/about" className="nav-link">About</Link>
      </div>
      <button className="logout-button" onClick={logout}>Logout</button>
    </nav>
  );
}

export default Navbar;
