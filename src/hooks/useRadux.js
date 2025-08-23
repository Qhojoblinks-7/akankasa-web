import { useRadux } from 'radux';
import { store } from '../store';
import { cultureActions, cultureSelectors } from '../store/slices/cultureSlice';
import { uiActions, uiSelectors } from '../store/slices/uiSlice';
import { languageActions, languageSelectors } from '../store/slices/languageSlice';
import { userActions, userSelectors } from '../store/slices/userSlice';

// Custom hook for culture state
export const useCulture = () => {
  const dispatch = useRadux(store);
  
  return {
    // State
    activeSection: useRadux(store, (state) => cultureSelectors.getActiveSection(state)),
    selectedItem: useRadux(store, (state) => cultureSelectors.getSelectedItem(state)),
    selectedItemType: useRadux(store, (state) => cultureSelectors.getSelectedItemType(state)),
    regionFilter: useRadux(store, (state) => cultureSelectors.getRegionFilter(state)),
    searchTerm: useRadux(store, (state) => cultureSelectors.getSearchTerm(state)),
    isLoading: useRadux(store, (state) => cultureSelectors.getLoading(state)),
    error: useRadux(store, (state) => cultureSelectors.getError(state)),
    currentPage: useRadux(store, (state) => cultureSelectors.getCurrentPage(state)),
    totalItems: useRadux(store, (state) => cultureSelectors.getTotalItems(state)),
    
    // Computed state
    filteredTraditions: useRadux(store, (state) => cultureSelectors.getFilteredTraditions(state)),
    filteredHistory: useRadux(store, (state) => cultureSelectors.getFilteredHistory(state)),
    filteredSymbols: useRadux(store, (state) => cultureSelectors.getFilteredSymbols(state)),
    
    // Actions
    setActiveSection: (section) => dispatch(cultureActions.setActiveSection(section)),
    setSelectedItem: (item, type) => dispatch(cultureActions.setSelectedItem(item, type)),
    setRegionFilter: (region) => dispatch(cultureActions.setRegionFilter(region)),
    setSearchTerm: (term) => dispatch(cultureActions.setSearchTerm(term)),
    setCurrentPage: (page) => dispatch(cultureActions.setCurrentPage(page)),
    clearSelection: () => dispatch(cultureActions.clearSelection()),
    resetFilters: () => dispatch(cultureActions.resetFilters()),
    loadCulturalData: () => dispatch(cultureActions.loadCulturalData()),
  };
};

// Custom hook for UI state
export const useUI = () => {
  const dispatch = useRadux(store);
  
  return {
    // State
    isMobileMenuOpen: useRadux(store, (state) => uiSelectors.getMobileMenuOpen(state)),
    isModalOpen: useRadux(store, (state) => uiSelectors.getModalOpen(state)),
    activeModal: useRadux(store, (state) => uiSelectors.getActiveModal(state)),
    isLoading: useRadux(store, (state) => uiSelectors.getLoading(state)),
    toast: useRadux(store, (state) => uiSelectors.getToast(state)),
    theme: useRadux(store, (state) => uiSelectors.getTheme(state)),
    sidebarOpen: useRadux(store, (state) => uiSelectors.getSidebarOpen(state)),
    
    // Actions
    setMobileMenu: (isOpen) => dispatch(uiActions.setMobileMenu(isOpen)),
    setModal: (isOpen, modal) => dispatch(uiActions.setModal(isOpen, modal)),
    setLoading: (loading) => dispatch(uiActions.setLoading(loading)),
    setToast: (toast) => dispatch(uiActions.setToast(toast)),
    setTheme: (theme) => dispatch(uiActions.setTheme(theme)),
    setSidebar: (isOpen) => dispatch(uiActions.setSidebar(isOpen)),
    resetUI: () => dispatch(uiActions.resetUI()),
  };
};

// Custom hook for language state
export const useLanguage = () => {
  const dispatch = useRadux(store);
  
  return {
    // State
    currentLanguage: useRadux(store, (state) => languageSelectors.getCurrentLanguage(state)),
    availableLanguages: useRadux(store, (state) => languageSelectors.getAvailableLanguages(state)),
    translations: useRadux(store, (state) => languageSelectors.getTranslations(state)),
    isLoading: useRadux(store, (state) => languageSelectors.getLoading(state)),
    error: useRadux(store, (state) => languageSelectors.getError(state)),
    
    // Computed state
    t: (key) => {
      const state = store.getState();
      return languageSelectors.getTranslation(state, key);
    },
    
    // Actions
    setCurrentLanguage: (language) => dispatch(languageActions.setCurrentLanguage(language)),
    setAvailableLanguages: (languages) => dispatch(languageActions.setAvailableLanguages(languages)),
    setTranslations: (translations) => dispatch(languageActions.setTranslations(translations)),
    loadTranslations: () => dispatch(languageActions.loadTranslations()),
    resetLanguage: () => dispatch(languageActions.resetLanguage()),
  };
};

// Custom hook for user state
export const useUser = () => {
  const dispatch = useRadux(store);
  
  return {
    // State
    isAuthenticated: useRadux(store, (state) => userSelectors.getAuthenticated(state)),
    user: useRadux(store, (state) => userSelectors.getUser(state)),
    preferences: useRadux(store, (state) => userSelectors.getPreferences(state)),
    learningProgress: useRadux(store, (state) => userSelectors.getLearningProgress(state)),
    communityActivity: useRadux(store, (state) => userSelectors.getCommunityActivity(state)),
    isLoading: useRadux(store, (state) => userSelectors.getLoading(state)),
    error: useRadux(store, (state) => userSelectors.getError(state)),
    
    // Computed state
    userName: useRadux(store, (state) => userSelectors.getUserName(state)),
    userEmail: useRadux(store, (state) => userSelectors.getUserEmail(state)),
    userRole: useRadux(store, (state) => userSelectors.getUserRole(state)),
    
    // Actions
    setAuthenticated: (isAuthenticated) => dispatch(userActions.setAuthenticated(isAuthenticated)),
    setUser: (user) => dispatch(userActions.setUser(user)),
    setPreferences: (preferences) => dispatch(userActions.setPreferences(preferences)),
    setLearningProgress: (progress) => dispatch(userActions.setLearningProgress(progress)),
    setCommunityActivity: (activity) => dispatch(userActions.setCommunityActivity(activity)),
    updatePreference: (key, value) => dispatch(userActions.updatePreference(key, value)),
    updateLearningProgress: (key, value) => dispatch(userActions.updateLearningProgress(key, value)),
    updateCommunityActivity: (key, value) => dispatch(userActions.updateCommunityActivity(key, value)),
    logout: () => dispatch(userActions.logout()),
    resetUser: () => dispatch(userActions.resetUser()),
  };
};

// Export the main useRadux hook for direct store access
export { useRadux };
export default useRadux;