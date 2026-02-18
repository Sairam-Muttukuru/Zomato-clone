import React, { createContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Configure axios baseURL for all auth-related requests
  axios.defaults.baseURL = 'http://localhost:3000';

  useEffect(() => {
    const saved = localStorage.getItem('auth');
    if (saved) {
      try {
        const { user: u, token: t } = JSON.parse(saved);
        setUser(u || null);
        setToken(t || null);
        if (t) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${t}`;
        }
      } catch {}
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const saveAuth = (u, t) => {
    setUser(u);
    setToken(t);
    localStorage.setItem('auth', JSON.stringify({ user: u, token: t }));
  };

  const clearAuth = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth');
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post('/auth/login', { email, password });
      const { user: u, token: t } = res.data || {};
      if (!u || !t) throw new Error('Invalid response from server');
      saveAuth(u, t);
      return u;
    } catch (err) {
      const msg = err?.response?.data?.error || 'Login failed';
      throw new Error(msg);
    }
  };

  const signup = async (name, email, password, imageUrl) => {
    try {
      const res = await axios.post('/auth/signup', { name, email, password, imageUrl });
      const { user: u, token: t } = res.data || {};
      if (!u || !t) throw new Error('Invalid response from server');
      saveAuth(u, t);
      return u;
    } catch (err) {
      console.error('Signup error:', err?.response?.data || err.message || err);
      const msg = err?.response?.data?.error || 'Signup failed';
      throw new Error(msg);
    }
  };

  const logout = () => {
    clearAuth();
  };

  const value = useMemo(() => ({ user, token, loading, login, signup, logout }), [user, token, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
