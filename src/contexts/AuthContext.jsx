import React, { createContext, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';

/* eslint-disable react-refresh/only-export-components */
export const AuthContext = createContext(null);
/* eslint-enable react-refresh/only-export-components */

export const AuthProvider = ({ children }) => {
  const auth = useAuthStore();
  const { initialize } = auth;

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <AuthContext.Provider value={{ ...auth }}>
      {children}
    </AuthContext.Provider>
  );
};
