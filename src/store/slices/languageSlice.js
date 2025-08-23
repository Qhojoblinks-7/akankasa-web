import { createSlice } from 'radux';

// Initial state for language management
const initialState = {
  // Current language
  currentLanguage: 'en', // 'en', 'tw'
  
  // Available languages
  availableLanguages: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'tw', name: 'Twi', nativeName: 'Twi' },
  ],
  
  // Language preferences
  preferredLanguage: 'en',
  
  // Translation data
  translations: {},
  
  // Loading states
  isLoadingTranslations: false,
  translationError: null,
  
  // RTL support
  isRTL: false,
  
  // Font preferences for different languages
  fontPreferences: {
    en: 'Inter',
    tw: 'Georama',
  },
};

// Action types
export const LANGUAGE_ACTIONS = {
  SET_CURRENT_LANGUAGE: 'language/setCurrentLanguage',
  SET_PREFERRED_LANGUAGE: 'language/setPreferredLanguage',
  SET_TRANSLATIONS: 'language/setTranslations',
  SET_LOADING_TRANSLATIONS: 'language/setLoadingTranslations',
  SET_TRANSLATION_ERROR: 'language/setTranslationError',
  SET_RTL: 'language/setRTL',
  SET_FONT_PREFERENCES: 'language/setFontPreferences',
  LOAD_TRANSLATIONS: 'language/loadTranslations',
  RESET_LANGUAGE_STATE: 'language/resetLanguageState',
};

// Language slice
export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    // Set current language
    setCurrentLanguage: (state, action) => {
      const newLanguage = action.payload;
      state.currentLanguage = newLanguage;
      
      // Update RTL based on language
      state.isRTL = newLanguage === 'ar' || newLanguage === 'he';
      
      // Update document attributes
      document.documentElement.setAttribute('lang', newLanguage);
      document.documentElement.setAttribute('dir', state.isRTL ? 'rtl' : 'ltr');
      
      // Update font family
      const fontFamily = state.fontPreferences[newLanguage] || 'Inter';
      document.documentElement.style.setProperty('--font-family', fontFamily);
      
      // Store in localStorage
      localStorage.setItem('akan-kasa-language', newLanguage);
    },

    // Set preferred language
    setPreferredLanguage: (state, action) => {
      state.preferredLanguage = action.payload;
      localStorage.setItem('akan-kasa-preferred-language', action.payload);
    },

    // Set translations
    setTranslations: (state, action) => {
      state.translations = action.payload;
    },

    // Set loading state for translations
    setLoadingTranslations: (state, action) => {
      state.isLoadingTranslations = action.payload;
    },

    // Set translation error
    setTranslationError: (state, action) => {
      state.translationError = action.payload;
    },

    // Set RTL state
    setRTL: (state, action) => {
      state.isRTL = action.payload;
      document.documentElement.setAttribute('dir', action.payload ? 'rtl' : 'ltr');
    },

    // Set font preferences
    setFontPreferences: (state, action) => {
      state.fontPreferences = { ...state.fontPreferences, ...action.payload };
    },

    // Load translations (placeholder for future API integration)
    loadTranslations: (state) => {
      state.isLoadingTranslations = true;
      state.translationError = null;
      
      try {
        // For now, use mock translations. In production, this would be an API call
        state.translations = {
          en: {
            home: 'Home',
            learnAkan: 'Learn Akan',
            culture: 'Culture',
            dictionary: 'Dictionary',
            community: 'Community',
            research: 'Research',
            // Add more translations as needed
          },
          tw: {
            home: 'Fie',
            learnAkan: 'Sua Akan',
            culture: 'Amammere',
            dictionary: 'Asɛmfua',
            community: 'Abusua',
            research: 'Nhwehwɛmu',
            // Add more translations as needed
          },
        };
      } catch (error) {
        state.translationError = error.message;
      } finally {
        state.isLoadingTranslations = false;
      }
    },

    // Reset language state
    resetLanguageState: (state) => {
      state.currentLanguage = 'en';
      state.preferredLanguage = 'en';
      state.translations = {};
      state.isLoadingTranslations = false;
      state.translationError = null;
      state.isRTL = false;
      
      // Reset document attributes
      document.documentElement.setAttribute('lang', 'en');
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.style.setProperty('--font-family', 'Inter');
    },
  },
});

// Export actions
export const {
  setCurrentLanguage,
  setPreferredLanguage,
  setTranslations,
  setLoadingTranslations,
  setTranslationError,
  setRTL,
  setFontPreferences,
  loadTranslations,
  resetLanguageState,
} = languageSlice.actions;

// Selectors for easy state access
export const selectLanguage = (state) => state.language;

export const selectCurrentLanguage = (state) => state.language.currentLanguage;
export const selectPreferredLanguage = (state) => state.language.preferredLanguage;
export const selectAvailableLanguages = (state) => state.language.availableLanguages;
export const selectTranslations = (state) => state.language.translations;
export const selectIsLoadingTranslations = (state) => state.language.isLoadingTranslations;
export const selectTranslationError = (state) => state.language.translationError;
export const selectIsRTL = (state) => state.language.isRTL;
export const selectFontPreferences = (state) => state.language.fontPreferences;

// Computed selectors
export const selectCurrentTranslations = (state) => {
  const currentLang = state.language.currentLanguage;
  return state.language.translations[currentLang] || {};
};

export const selectTranslation = (state, key) => {
  const currentLang = state.language.currentLanguage;
  const translations = state.language.translations[currentLang] || {};
  return translations[key] || key; // Fallback to key if translation not found
};

export const selectCurrentFont = (state) => {
  const currentLang = state.language.currentLanguage;
  return state.language.fontPreferences[currentLang] || 'Inter';
};

export const selectIsLanguageSupported = (state, languageCode) => {
  return state.language.availableLanguages.some(lang => lang.code === languageCode);
};

// Async action creators
export const initializeLanguage = () => async (dispatch) => {
  try {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('akan-kasa-language');
    const savedPreferredLanguage = localStorage.getItem('akan-kasa-preferred-language');
    
    // Check browser language
    const browserLanguage = navigator.language.split('-')[0];
    const supportedLanguages = ['en', 'tw'];
    const detectedLanguage = supportedLanguages.includes(browserLanguage) ? browserLanguage : 'en';
    
    // Set language priority: saved > preferred > browser > default
    const languageToUse = savedLanguage || savedPreferredLanguage || detectedLanguage;
    
    // Load translations
    dispatch(loadTranslations());
    
    // Set language
    dispatch(setCurrentLanguage(languageToUse));
    if (savedPreferredLanguage) {
      dispatch(setPreferredLanguage(savedPreferredLanguage));
    }
    
  } catch (error) {
    console.error('Failed to initialize language:', error);
    // Fallback to English
    dispatch(setCurrentLanguage('en'));
  }
};

export const changeLanguage = (languageCode) => async (dispatch) => {
  try {
    // Validate language code
    const supportedLanguages = ['en', 'tw'];
    if (!supportedLanguages.includes(languageCode)) {
      throw new Error(`Unsupported language: ${languageCode}`);
    }
    
    // Set new language
    dispatch(setCurrentLanguage(languageCode));
    
    // Show success message
    const messages = {
      en: 'Language changed to English',
      tw: 'Kasa akyerɛɛ Twi',
    };
    
    // Note: This would need to be imported from uiSlice
    // dispatch(showSuccessToast(messages[languageCode]));
    
  } catch (error) {
    console.error('Failed to change language:', error);
    // Note: This would need to be imported from uiSlice
    // dispatch(showErrorToast('Failed to change language'));
  }
};

export const fetchTranslations = (languageCode) => async (dispatch) => {
  dispatch(setLoadingTranslations(true));
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // In production, this would be:
    // const response = await fetch(`/api/translations/${languageCode}`);
    // const translations = await response.json();
    
    // For now, use mock data
    const mockTranslations = {
      en: {
        home: 'Home',
        learnAkan: 'Learn Akan',
        culture: 'Culture',
        dictionary: 'Dictionary',
        community: 'Community',
        research: 'Research',
      },
      tw: {
        home: 'Fie',
        learnAkan: 'Sua Akan',
        culture: 'Amammere',
        dictionary: 'Asɛmfua',
        community: 'Abusua',
        research: 'Nhwehwɛmu',
      },
    };
    
    dispatch(setTranslations(mockTranslations));
    
  } catch (error) {
    dispatch(setTranslationError(error.message));
  } finally {
    dispatch(setLoadingTranslations(false));
  }
};