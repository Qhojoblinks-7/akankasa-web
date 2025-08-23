import { createSlice } from '@reduxjs/toolkit';

// Initial state for language management
const initialState = {
  currentLanguage: 'en',
  availableLanguages: ['en', 'tw'],
  translations: {},
  isLoading: false,
  error: null,
};

// Create the language slice
const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    // Reducers that directly set the state
    setCurrentLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
    setAvailableLanguages: (state, action) => {
      state.availableLanguages = action.payload;
    },
    setTranslations: (state, action) => {
      state.translations = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    // The loadTranslations action is used to trigger a data fetch,
    // so it only needs to set loading and clear errors.
    loadTranslations: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    resetLanguage: () => initialState,
  },
});

// Selectors
export const languageSelectors = {
  getCurrentLanguage: (state) => state.language.currentLanguage,
  getAvailableLanguages: (state) => state.language.availableLanguages,
  getTranslations: (state) => state.language.translations,
  getLoading: (state) => state.language.isLoading,
  getError: (state) => state.language.error,
  
  // Computed selectors
  getTranslation: (state, key) => {
    const { currentLanguage, translations } = state.language;
    return translations[currentLanguage]?.[key] || key;
  },
  
  getCurrentTranslations: (state) => {
    const { currentLanguage, translations } = state.language;
    return translations[currentLanguage] || {};
  },
};

export const languageActions = {
  ...languageSlice.actions,
};
export const {
  setCurrentLanguage,
  setAvailableLanguages,
  setTranslations,
  setLoading,
  setError,
  loadTranslations,
  resetLanguage,
} = languageSlice.actions;

export default languageSlice.reducer;