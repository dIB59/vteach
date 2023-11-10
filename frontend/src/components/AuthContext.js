import React, { createContext, useContext, useState } from 'react';

import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    try {
      // Send a login request to the server
      const response = await axios.post('YOUR_BACKEND_LOGIN_ENDPOINT', userData);
      
      //  server sends a JWT token upon successful login
      const { token, user } = response.data;

      // Save the token to local storage
      localStorage.setItem('token', token);

      // Set the user in the context state
      setUser(user);
    } catch (error) {
      console.error('Login failed:', error);
    }
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
