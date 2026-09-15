import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('ansari_token');
      if (token) {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data);
        } catch (error) {
          console.error('Session restore failed:', error);
          localStorage.removeItem('ansari_token');
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('ansari_token', res.data.token);
      setUser(res.data);
      addToast(`Welcome back, ${res.data.name}!`);
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || 'Invalid email or password';
      addToast(msg, 'error');
      return { success: false, message: msg };
    }
  };

  const register = async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      localStorage.setItem('ansari_token', res.data.token);
      setUser(res.data);
      addToast(`Welcome to Ansari Furniture, ${res.data.name}!`);
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed';
      addToast(msg, 'error');
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    localStorage.removeItem('ansari_token');
    setUser(null);
    addToast('You have been signed out.');
  };

  const updateProfile = async (updatedData) => {
    try {
      const res = await api.put('/auth/profile', updatedData);
      setUser(res.data);
      addToast('Profile updated successfully.');
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to update profile';
      addToast(msg, 'error');
      return { success: false, message: msg };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
