import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate('/welcome');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="login-title">Login</h2>

      <input
        type="text"
        className="login-input"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />

      <input
        type="password"
        className="login-input"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button type="submit" className="login-button">Login</button>

      <p className="login-link">
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
}

export default Login;
