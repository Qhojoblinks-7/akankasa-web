import { dictionaryData, communityData } from '../data/mockData';

// Lightweight promise-based API wrapper for frontend-backend handoff
// Replace implementations with real HTTP calls when backend is ready.

export const getDictionary = async () => {
  // simulate async behavior
  return new Promise((resolve) => setTimeout(() => resolve(dictionaryData), 50));
};

export const getEvents = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(communityData.events || []), 50));
};

export const getRegistrations = async () => {
  try {
    const raw = localStorage.getItem('akan:registrations');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveRegistration = async (registration) => {
  const regs = await getRegistrations();
  regs.push(registration);
  try {
    localStorage.setItem('akan:registrations', JSON.stringify(regs));
  } catch {}
  return registration;
};

export const getFavorites = async () => {
  try {
    const raw = localStorage.getItem('akan:favorites');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveFavorites = async (favorites) => {
  try {
    localStorage.setItem('akan:favorites', JSON.stringify(favorites));
  } catch {}
  return favorites;
};
