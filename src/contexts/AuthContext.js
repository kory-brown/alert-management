import React, { createContext, useState, useContext, useEffect } from 'react';
import { AUTH_CONFIG } from '../config/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check localStorage for existing auth
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const { username } = JSON.parse(storedAuth);
      setIsAuthenticated(true);
      setUser({ username });
    }
  }, []);

  const login = (username, password) => {
    if (username === AUTH_CONFIG.credentials.username && 
        password === AUTH_CONFIG.credentials.password) {
      const userData = { username };
      localStorage.setItem('auth', JSON.stringify(userData));
      setIsAuthenticated(true);
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 