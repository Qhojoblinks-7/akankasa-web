import { useRadux } from 'radux';
import { store } from '../store';

// Custom hook that provides easy access to Radux store
export const useAkanKasaStore = () => {
  return useRadux(store);
};

// Hook for accessing culture state and actions
export const useCulture = () => {
  const { state, dispatch } = useRadux(store);
  
  return {
    // State
    activeSection: state.culture.activeSection,
    selectedItem: state.culture.selectedItem,
    selectedItemType: state.culture.selectedItemType,
    selectedRegion: state.culture.selectedRegion,
    searchTerm: state.culture.searchTerm,
    isLoading: state.culture.isLoading,
    error: state.culture.error,
    currentPage: state.culture.currentPage,
    totalItems: state.culture.totalItems,
    traditions: state.culture.traditions,
    history: state.culture.history,
    symbols: state.culture.symbols,
    
    // Computed state
    filteredContent: state.culture.activeSection === 'traditions' ? 
      state.culture.traditions.filter(item => {
        if (state.culture.selectedRegion !== 'all' && item.region !== state.culture.selectedRegion) {
          return false;
        }
        if (state.culture.searchTerm) {
          const searchLower = state.culture.searchTerm.toLowerCase();
          return item.title.toLowerCase().includes(searchLower) ||
                 item.description.toLowerCase().includes(searchLower) ||
                 item.content.toLowerCase().includes(searchLower) ||
                 (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchLower)));
        }
        return true;
      }) : 
      state.culture.activeSection === 'history' ? 
        state.culture.history.filter(item => {
          if (state.culture.selectedRegion !== 'all' && item.region !== state.culture.selectedRegion) {
            return false;
          }
          if (state.culture.searchTerm) {
            const searchLower = state.culture.searchTerm.toLowerCase();
            return item.title.toLowerCase().includes(searchLower) ||
                   item.description.toLowerCase().includes(searchLower) ||
                   item.content.toLowerCase().includes(searchLower) ||
                   (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchLower)));
          }
          return true;
        }) :
        state.culture.symbols.filter(item => {
          if (state.culture.selectedRegion !== 'all' && item.region !== state.culture.selectedRegion) {
            return false;
          }
          if (state.culture.searchTerm) {
            const searchLower = state.culture.searchTerm.toLowerCase();
            return item.title.toLowerCase().includes(searchLower) ||
                   item.description.toLowerCase().includes(searchLower) ||
                   item.content.toLowerCase().includes(searchLower) ||
                   (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchLower)));
          }
          return true;
        }),
    
    availableRegions: ['all', ...new Set([
      ...state.culture.traditions.map(item => item.region),
      ...state.culture.history.map(item => item.region),
      ...state.culture.symbols.map(item => item.region),
    ].filter(Boolean))],
    
    // Actions
    setActiveSection: (section) => dispatch({ type: 'culture/setActiveSection', payload: section }),
    setSelectedItem: (item, type) => dispatch({ type: 'culture/setSelectedItem', payload: { item, type } }),
    setRegionFilter: (region) => dispatch({ type: 'culture/setRegionFilter', payload: region }),
    setSearchTerm: (term) => dispatch({ type: 'culture/setSearchTerm', payload: term }),
    setCurrentPage: (page) => dispatch({ type: 'culture/setCurrentPage', payload: page }),
    clearSelection: () => dispatch({ type: 'culture/clearSelection' }),
    resetFilters: () => dispatch({ type: 'culture/resetFilters' }),
    loadCulturalData: () => dispatch({ type: 'culture/loadCulturalData' }),
    fetchCulturalData: () => dispatch({ type: 'culture/fetchCulturalData' }),
    fetchItemById: (id, type) => dispatch({ type: 'culture/fetchItemById', payload: { id, type } }),
  };
};

// Hook for accessing UI state and actions
export const useUI = () => {
  const { state, dispatch } = useRadux(store);
  
  return {
    // State
    isContributeModalOpen: state.ui.isContributeModalOpen,
    isDetailModalOpen: state.ui.isDetailModalOpen,
    isMobileMenuOpen: state.ui.isMobileMenuOpen,
    isSidebarOpen: state.ui.isSidebarOpen,
    isPageLoading: state.ui.isPageLoading,
    loadingMessage: state.ui.loadingMessage,
    toast: state.ui.toast,
    theme: state.ui.theme,
    isHighContrast: state.ui.isHighContrast,
    isReducedMotion: state.ui.isReducedMotion,
    isMobile: state.ui.isMobile,
    isTablet: state.ui.isTablet,
    isDesktop: state.ui.isDesktop,
    scrollPosition: state.ui.scrollPosition,
    isScrolled: state.ui.isScrolled,
    lastFocusedElement: state.ui.lastFocusedElement,
    isKeyboardNavigation: state.ui.isKeyboardNavigation,
    
    // Computed state
    isAnyModalOpen: state.ui.isContributeModalOpen || state.ui.isDetailModalOpen,
    isAnyNavigationOpen: state.ui.isMobileMenuOpen || state.ui.isSidebarOpen,
    isAnyOverlayOpen: state.ui.isContributeModalOpen || state.ui.isDetailModalOpen || 
                     state.ui.isMobileMenuOpen || state.ui.isSidebarOpen,
    
    // Actions
    setContributeModal: (isOpen) => dispatch({ type: 'ui/setContributeModal', payload: isOpen }),
    setDetailModal: (isOpen) => dispatch({ type: 'ui/setDetailModal', payload: isOpen }),
    setMobileMenu: (isOpen) => dispatch({ type: 'ui/setMobileMenu', payload: isOpen }),
    setSidebar: (isOpen) => dispatch({ type: 'ui/setSidebar', payload: isOpen }),
    setPageLoading: (isLoading) => dispatch({ type: 'ui/setPageLoading', payload: isLoading }),
    setLoadingMessage: (message) => dispatch({ type: 'ui/setLoadingMessage', payload: message }),
    showToast: (toastData) => dispatch({ type: 'ui/showToast', payload: toastData }),
    hideToast: () => dispatch({ type: 'ui/hideToast' }),
    setTheme: (theme) => dispatch({ type: 'ui/setTheme', payload: theme }),
    setHighContrast: (enabled) => dispatch({ type: 'ui/setHighContrast', payload: enabled }),
    setReducedMotion: (enabled) => dispatch({ type: 'ui/setReducedMotion', payload: enabled }),
    resetUIState: () => dispatch({ type: 'ui/resetUIState' }),
    
    // Convenience actions
    showSuccessToast: (message) => dispatch({ 
      type: 'ui/showToast', 
      payload: { message, type: 'success' } 
    }),
    showErrorToast: (message) => dispatch({ 
      type: 'ui/showToast', 
      payload: { message, type: 'error' } 
    }),
    showWarningToast: (message) => dispatch({ 
      type: 'ui/showToast', 
      payload: { message, type: 'warning' } 
    }),
    showInfoToast: (message) => dispatch({ 
      type: 'ui/showToast', 
      payload: { message, type: 'info' } 
    }),
  };
};

// Hook for accessing language state and actions
export const useLanguage = () => {
  const { state, dispatch } = useRadux(store);
  
  return {
    // State
    currentLanguage: state.language.currentLanguage,
    preferredLanguage: state.language.preferredLanguage,
    availableLanguages: state.language.availableLanguages,
    translations: state.language.translations,
    isLoadingTranslations: state.language.isLoadingTranslations,
    translationError: state.language.translationError,
    isRTL: state.language.isRTL,
    fontPreferences: state.language.fontPreferences,
    
    // Computed state
    currentTranslations: state.language.translations[state.language.currentLanguage] || {},
    currentFont: state.language.fontPreferences[state.language.currentLanguage] || 'Inter',
    
    // Actions
    setCurrentLanguage: (language) => dispatch({ type: 'language/setCurrentLanguage', payload: language }),
    setPreferredLanguage: (language) => dispatch({ type: 'language/setPreferredLanguage', payload: language }),
    setTranslations: (translations) => dispatch({ type: 'language/setTranslations', payload: translations }),
    setLoadingTranslations: (isLoading) => dispatch({ type: 'language/setLoadingTranslations', payload: isLoading }),
    setTranslationError: (error) => dispatch({ type: 'language/setTranslationError', payload: error }),
    setRTL: (isRTL) => dispatch({ type: 'language/setRTL', payload: isRTL }),
    setFontPreferences: (preferences) => dispatch({ type: 'language/setFontPreferences', payload: preferences }),
    loadTranslations: () => dispatch({ type: 'language/loadTranslations' }),
    resetLanguageState: () => dispatch({ type: 'language/resetLanguageState' }),
    
    // Convenience actions
    changeLanguage: (languageCode) => dispatch({ type: 'language/changeLanguage', payload: languageCode }),
    fetchTranslations: (languageCode) => dispatch({ type: 'language/fetchTranslations', payload: languageCode }),
    
    // Translation helper
    t: (key) => {
      const currentLang = state.language.currentLanguage;
      const translations = state.language.translations[currentLang] || {};
      return translations[key] || key;
    },
  };
};

// Hook for accessing user state and actions
export const useUser = () => {
  const { state, dispatch } = useRadux(store);
  
  return {
    // State
    isAuthenticated: state.user.isAuthenticated,
    user: state.user.user,
    token: state.user.token,
    preferences: state.user.preferences,
    learningProgress: state.user.learningProgress,
    communityActivity: state.user.communityActivity,
    isLoading: state.user.isLoading,
    isUpdating: state.user.isUpdating,
    error: state.user.error,
    sessionExpiry: state.user.sessionExpiry,
    isSessionValid: state.user.isSessionValid,
    
    // Computed state
    userLevel: state.user.learningProgress.level,
    completedLessons: state.user.learningProgress.completedLessons,
    vocabularyMastered: state.user.learningProgress.vocabularyMastered,
    currentStreak: state.user.learningProgress.currentStreak,
    totalStudyTime: state.user.learningProgress.totalStudyTime,
    userContributions: state.user.communityActivity.contributions,
    userDiscussions: state.user.communityActivity.discussions,
    userEvents: state.user.communityActivity.events,
    userBadges: state.user.communityActivity.badges,
    accessibilityPreferences: state.user.preferences.accessibility,
    themePreference: state.user.preferences.theme,
    languagePreference: state.user.preferences.language,
    notificationPreference: state.user.preferences.notifications,
    emailUpdatesPreference: state.user.preferences.emailUpdates,
    
    // Actions
    setAuthentication: (authData) => dispatch({ type: 'user/setAuthentication', payload: authData }),
    setUser: (user) => dispatch({ type: 'user/setUser', payload: user }),
    setToken: (token) => dispatch({ type: 'user/setToken', payload: token }),
    setPreferences: (preferences) => dispatch({ type: 'user/setPreferences', payload: preferences }),
    updatePreference: (key, value) => dispatch({ type: 'user/updatePreference', payload: { key, value } }),
    setLearningProgress: (progress) => dispatch({ type: 'user/setLearningProgress', payload: progress }),
    updateLearningProgress: (type, data) => dispatch({ type: 'user/updateLearningProgress', payload: { type, data } }),
    setCommunityActivity: (activity) => dispatch({ type: 'user/setCommunityActivity', payload: activity }),
    updateCommunityActivity: (type, data) => dispatch({ type: 'user/updateCommunityActivity', payload: { type, data } }),
    setLoading: (isLoading) => dispatch({ type: 'user/setLoading', payload: isLoading }),
    setUpdating: (isUpdating) => dispatch({ type: 'user/setUpdating', payload: isUpdating }),
    setError: (error) => dispatch({ type: 'user/setError', payload: error }),
    setSessionExpiry: (expiry) => dispatch({ type: 'user/setSessionExpiry', payload: expiry }),
    setSessionValid: (isValid) => dispatch({ type: 'user/setSessionValid', payload: isValid }),
    logout: () => dispatch({ type: 'user/logout' }),
    resetUserState: () => dispatch({ type: 'user/resetUserState' }),
    
    // Async actions
    loginUser: (credentials) => dispatch({ type: 'user/loginUser', payload: credentials }),
    registerUser: (userData) => dispatch({ type: 'user/registerUser', payload: userData }),
    logoutUser: () => dispatch({ type: 'user/logoutUser' }),
    updateUserProfile: (updates) => dispatch({ type: 'user/updateUserProfile', payload: updates }),
    initializeUser: () => dispatch({ type: 'user/initializeUser' }),
  };
};

// Hook for accessing all store state
export const useStore = () => {
  const { state, dispatch } = useRadux(store);
  
  return {
    state,
    dispatch,
    culture: state.culture,
    ui: state.ui,
    language: state.language,
    user: state.user,
  };
};

// Hook for dispatching actions
export const useDispatch = () => {
  const { dispatch } = useRadux(store);
  return dispatch;
};

// Hook for accessing store state
export const useSelector = (selector) => {
  const { state } = useRadux(store);
  return selector(state);
};