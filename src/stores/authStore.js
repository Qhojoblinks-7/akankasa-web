import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(persist((set, get) => ({
  user: null,
  loading: true,
  error: null,

  initialize: async () => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('akankasa:auth_token');
      if (!token) {
        set({ user: null, loading: false });
        return;
      }
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: token },
      });
      if (!res.ok) {
        localStorage.removeItem('akankasa:auth_token');
        set({ user: null, loading: false });
        return;
      }
      const user = await res.json();
      set({ user, loading: false });
    } catch (err) {
      set({ error: err.message, user: null, loading: false });
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const text = await res.text();
      if (!res.ok) {
        let err;
        try { err = JSON.parse(text); } catch { err = { error: text || 'Login failed' }; }
        throw new Error(err.error || 'Login failed');
      }
      const data = JSON.parse(text);
      localStorage.setItem('akankasa:auth_token', data.token);
      set({ user: data.user, loading: false });
      return data;
    } catch (err) {
      set({ error: err.message, user: null, loading: false });
      throw err;
    }
  },

  register: async ({ name, email, password }) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Registration failed' }));
        throw new Error(err.error || 'Registration failed');
      }
      const loginData = await get().login({ email, password });
      return loginData;
    } catch (err) {
      set({ error: err.message, user: null, loading: false });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem('akankasa:auth_token');
    set({ user: null, loading: false, error: null });
  },

  updateUser: (updates) => {
    const current = get().user;
    if (!current) return;
    set({ user: { ...current, ...updates } });
  },
}), {
  name: 'akankasa:auth',
  partialize: (state) => ({ user: state.user }),
}));
