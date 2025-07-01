import React from 'react';
import '../styles/About.css';
import { useAuth } from '../context/AuthContext';

function About() {
  const { user } = useAuth();

  const roleDescriptions = {
    Manager: [
      'Access and manage the inventory (add/update items)',
      'View detailed sales statistics and analytics',
      'Full control over pricing and stock levels'
    ],
    Clerk: [
      'Generate customer bills from inventory items',
      'Print bills for checkout and maintain billing records'
    ],
    Staff: [
      'View inventory items',
      'Update stock quantities for existing items'
    ]
  };

  return (
    <div className="main-content">
      <div className="about-container">
        <h2 className="about-title">About</h2>
        <p className="about-description">
          This is the Supermarket Management System.
        </p>

        {user && (
          <>
            <h3 className="about-role-heading">Your Role: {user.user_type}</h3>
            <ul className="about-role-list">
              {roleDescriptions[user.user_type].map((point, index) => (
                <li key={index} className="about-role-list-item">{point}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default About;
