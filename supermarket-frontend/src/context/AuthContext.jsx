import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await api.get('/api/profile');
      setUser(res.data.profile);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (formData) => {
    await api.post('/api/login', formData);
    await fetchUser();
  };

  const register = async (formData) => {
    await api.post('/api/register', formData);
    await fetchUser();
  };

  const logout = async () => {
    await api.get('/api/logout');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
