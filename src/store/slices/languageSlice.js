// Language slice using Radux v0.6.4 compatible approach

// Initial state for language management
const initialState = {
  currentLanguage: 'en',
  availableLanguages: ['en', 'tw'],
  translations: {},
  isLoading: false,
  error: null,
};

// Action types
export const LANGUAGE_ACTIONS = {
  SET_CURRENT_LANGUAGE: 'language/setCurrentLanguage',
  SET_AVAILABLE_LANGUAGES: 'language/setAvailableLanguages',
  SET_TRANSLATIONS: 'language/setTranslations',
  SET_LOADING: 'language/setLoading',
  SET_ERROR: 'language/setError',
  LOAD_TRANSLATIONS: 'language/loadTranslations',
  RESET_LANGUAGE: 'language/resetLanguage',
};

// Language reducer
export const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case LANGUAGE_ACTIONS.SET_CURRENT_LANGUAGE:
      return {
        ...state,
        currentLanguage: action.payload,
      };

    case LANGUAGE_ACTIONS.SET_AVAILABLE_LANGUAGES:
      return {
        ...state,
        availableLanguages: action.payload,
      };

    case LANGUAGE_ACTIONS.SET_TRANSLATIONS:
      return {
        ...state,
        translations: action.payload,
      };

    case LANGUAGE_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case LANGUAGE_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case LANGUAGE_ACTIONS.LOAD_TRANSLATIONS:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case LANGUAGE_ACTIONS.RESET_LANGUAGE:
      return initialState;

    default:
      return state;
  }
};

// Action creators
export const languageActions = {
  setCurrentLanguage: (language) => ({
    type: LANGUAGE_ACTIONS.SET_CURRENT_LANGUAGE,
    payload: language,
  }),

  setAvailableLanguages: (languages) => ({
    type: LANGUAGE_ACTIONS.SET_AVAILABLE_LANGUAGES,
    payload: languages,
  }),

  setTranslations: (translations) => ({
    type: LANGUAGE_ACTIONS.SET_TRANSLATIONS,
    payload: translations,
  }),

  setLoading: (loading) => ({
    type: LANGUAGE_ACTIONS.SET_LOADING,
    payload: loading,
  }),

  setError: (error) => ({
    type: LANGUAGE_ACTIONS.SET_ERROR,
    payload: error,
  }),

  loadTranslations: () => ({
    type: LANGUAGE_ACTIONS.LOAD_TRANSLATIONS,
  }),

  resetLanguage: () => ({
    type: LANGUAGE_ACTIONS.RESET_LANGUAGE,
  }),
};

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

// Export the reducer as default for store configuration
export default languageReducer;