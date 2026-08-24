import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAuthStore } from './authStore';

export const useContributionStore = create(persist((set) => ({
  contributions: [],
  loading: false,
  error: null,

  fetchUserContributions: async () => {
    const { user } = useAuthStore.getState();
    if (!user) {
      set({ contributions: [], error: 'Not authenticated' });
      return;
    }
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('akankasa:auth_token');
      const res = await fetch('/api/contributions/my', {
        headers: { Authorization: token },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Failed to fetch contributions' }));
        throw new Error(err.error || 'Failed to fetch contributions');
      }
      const data = await res.json();
      set({ contributions: data.contributions || [], loading: false });
    } catch (err) {
      set({ error: err.message, contributions: [], loading: false });
    }
  },

  submitContribution: async (type, payload) => {
    const { user } = useAuthStore.getState();
    if (!user) {
      const err = new Error('You must be logged in to contribute');
      set({ error: err.message });
      throw err;
    }
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('akankasa:auth_token');
      const res = await fetch(`/api/contributions/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Submission failed' }));
        throw new Error(err.error || 'Submission failed');
      }
      const data = await res.json();
      set((state) => ({
        contributions: [data, ...state.contributions],
        loading: false,
      }));
      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  clearError: () => set({ error: null }),
}), {
  name: 'akankasa:contributions',
  partialize: (state) => ({ contributions: state.contributions }),
}));
