// src/api/mockApi.js
// [PM] This acts as the temporary API layer using static data + localStorage.
// [HOOK] Backend dev should replace each function with real HTTP calls (e.g., fetch/axios).

import { dictionaryData, communityData } from '../data/mockData';

// --- Dictionary ---
export const getDictionary = async () => {
  // [HOOK] Replace with GET /api/dictionary
  return new Promise((resolve) =>
    setTimeout(() => resolve(dictionaryData), 50)
  );
};

// --- Community / Events ---
export const getEvents = async () => {
  // [HOOK] Replace with GET /api/events
  return new Promise((resolve) =>
    setTimeout(() => resolve(communityData?.events || []), 50)
  );
};

// --- User Registrations ---
export const getRegistrations = async () => {
  try {
    const raw = localStorage.getItem('akan:registrations');
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('[API:getRegistrations]', err);
    return [];
  }
};

export const saveRegistration = async (registration) => {
  const regs = await getRegistrations();
  regs.push(registration);

  try {
    localStorage.setItem('akan:registrations', JSON.stringify(regs));
  } catch (err) {
    console.error('[API:saveRegistration]', err);
  }

  return registration;
};

// --- Favorites ---
export const getFavorites = async () => {
  try {
    const raw = localStorage.getItem('akan:favorites');
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('[API:getFavorites]', err);
    return [];
  }
};

export const saveFavorites = async (favorites) => {
  try {
    localStorage.setItem('akan:favorites', JSON.stringify(favorites));
  } catch (err) {
    console.error('[API:saveFavorites]', err);
  }
  return favorites;
};
// --- User Profile ---
