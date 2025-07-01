import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import About from './pages/About';
import Profile from './pages/Profile';
import Inventory from './pages/Inventory';
import Bill from './pages/Bill';
import PrintBill from './pages/PrintBill';
import SalesStat from './pages/SalesStat';
import NotFound from './pages/NotFound';

import './styles/Layout.css'; // ✅ Still useful if you're using .main padding or layout fixes

function App() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />

      {/* Optional wrapper div for main content styling */}
      <div className="main"> 
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={!user ? <Login /> : <Navigate to="/welcome" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/welcome" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/welcome" />} />

          {/* Protected Routes */}
          <Route path="/welcome" element={<PrivateRoute><Welcome /></PrivateRoute>} />
          <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

          <Route
            path="/inventory"
            element={
              <PrivateRoute>
                {(user?.user_type === 'Manager' || user?.user_type === 'Staff') ? (
                  <Inventory />
                ) : (
                  <Navigate to="/welcome" />
                )}
              </PrivateRoute>
            }
          />

          <Route
            path="/bill"
            element={
              <PrivateRoute>
                {user?.user_type === 'Clerk' ? <Bill /> : <Navigate to="/welcome" />}
              </PrivateRoute>
            }
          />

          <Route
            path="/print"
            element={
              <PrivateRoute>
                {user?.user_type === 'Clerk' ? <PrintBill /> : <Navigate to="/welcome" />}
              </PrivateRoute>
            }
          />

          <Route
            path="/stat"
            element={
              <PrivateRoute>
                {user?.user_type === 'Manager' ? <SalesStat /> : <Navigate to="/welcome" />}
              </PrivateRoute>
            }
          />

          {/* Catch All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
