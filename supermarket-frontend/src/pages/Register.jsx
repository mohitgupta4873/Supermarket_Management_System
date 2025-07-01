import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Register.css';

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    user_type: 'Manager'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate('/welcome');
    } catch {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2 className="register-title">Register</h2>

      <input
        type="text"
        placeholder="Name"
        className="register-input"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Username"
        className="register-input"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="register-input"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <select
        className="register-select"
        value={form.user_type}
        onChange={(e) => setForm({ ...form, user_type: e.target.value })}
      >
        <option value="Manager">Manager</option>
        <option value="Clerk">Clerk</option>
        <option value="Staff">Staff</option>
      </select>

      <button type="submit" className="register-button">Register</button>

      <p className="register-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
}

export default Register;
