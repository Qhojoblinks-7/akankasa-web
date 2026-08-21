import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, getCurrentUser } from '../api';

const AuthContext = createContext();

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const u = await getCurrentUser();
        setUser(u);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = async ({ email, password }) => {
    const data = await apiLogin({ email, password });
    localStorage.setItem('akankasa:auth_token', data.token);
    setUser(data.user);
    return data;
  };

  const register = async ({ name, email, password }) => {
    const data = await apiRegister({ name, email, password });
    const loginData = await apiLogin({ email, password });
    localStorage.setItem('akankasa:auth_token', loginData.token);
    setUser(loginData.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('akankasa:auth_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
