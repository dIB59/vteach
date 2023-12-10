import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (accessToken, refreshToken) => {
    // Save the token to local storage
    localStorage.setItem('token', refreshToken);
    console.log(token)

    // Set the user in the context state
    setUser(accessToken);
  };

  const logout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');

    // Clear the user from state
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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