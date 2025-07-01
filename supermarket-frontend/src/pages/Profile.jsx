import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Profile.css';

function Profile() {
  const { user } = useAuth();

  if (!user) return <p className="profile-loading">Loading...</p>;

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Role:</strong> {user.user_type}</p>
        <p><strong>Joined:</strong> {new Date(user.joining_date).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default Profile;
