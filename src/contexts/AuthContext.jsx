import React from 'react';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'akan:auth-role';

const ROLE_PERMISSIONS = {
  guest: [],
  member: ['createPost', 'editProfile', 'registerEvent'],
  moderator: ['createPost', 'editProfile', 'registerEvent', 'moderate', 'scheduleContent'],
  admin: ['createPost', 'editProfile', 'registerEvent', 'moderate', 'scheduleContent', 'adminView'],
};

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState('guest');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setRole(saved);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, role);
    } catch {}
  }, [role]);

  const can = (permission) => {
    const list = ROLE_PERMISSIONS[role] || [];
    return list.includes(permission);
  };

  const value = useMemo(() => ({ role, setRole, can }), [role]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};