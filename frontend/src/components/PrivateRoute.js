import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';

const PrivateRoute = ({ element }) => {
  const { user, logout } = useAuth();

  useEffect(() => {
    // Check if the user is authenticated
    const checkAuth = async () => {
      try {
        // Send a request to the server to validate the token
        const response = await axios.get('YOUR_BACKEND_AUTH_ENDPOINT');
        const authenticatedUser = response.data.user;

        if (authenticatedUser) {
          // If the token is valid, update the user in the context state
          setUser(authenticatedUser);
        } else {
          // If the token is invalid, log the user out
          logout();
        }
      } catch (error) {
        console.error('Authentication failed:', error);
        logout();
      }
    };

    checkAuth();
  }, [user, logout]);

  return user ? (
    <Route element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
