import { useSelector, useDispatch } from 'react-redux';
import { store } from '../store';
import { cultureActions, cultureSelectors } from '../store/slices/cultureSlice';
import { uiActions, uiSelectors } from '../store/slices/uiSlice';
import { languageActions, languageSelectors } from '../store/slices/languageSlice';
import { userActions, userSelectors } from '../store/slices/userSlice';

// Custom hook for accessing the Redux store
const useRadux = (selector) => {
  const dispatch = useDispatch();
  
  // Always call useSelector to maintain hook order
  const selectedValue = useSelector(selector || (() => undefined));
  
  return selector ? selectedValue : dispatch;
};

// Custom hook for culture state
export const useCulture = () => {
  const dispatch = useRadux();
  
  return {
    // State
    activeSection: useRadux((state) => cultureSelectors.getActiveSection(state)),
    selectedItem: useRadux((state) => cultureSelectors.getSelectedItem(state)),
    selectedItemType: useRadux((state) => cultureSelectors.getSelectedItemType(state)),
    regionFilter: useRadux((state) => cultureSelectors.getSelectedRegion(state)),
    searchTerm: useRadux((state) => cultureSelectors.getSearchTerm(state)),
    isLoading: useRadux((state) => cultureSelectors.getLoading(state)),
    error: useRadux((state) => cultureSelectors.getError(state)),
    currentPage: useRadux((state) => cultureSelectors.getCurrentPage(state)),
    totalItems: useRadux((state) => cultureSelectors.getTotalItems(state)),
    
    // Computed state
    filteredTraditions: useRadux((state) => cultureSelectors.getFilteredTraditions(state)),
    filteredHistory: useRadux((state) => cultureSelectors.getFilteredHistory(state)),
    filteredSymbols: useRadux((state) => cultureSelectors.getFilteredSymbols(state)),
    availableRegions: useRadux((state) => cultureSelectors.getAvailableRegions(state)),
    filteredContent: useRadux((state) => cultureSelectors.getFilteredContent(state)),
    
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
  const dispatch = useRadux();
  
  return {
    // State
    isMobileMenuOpen: useRadux((state) => uiSelectors.getMobileMenuOpen(state)),
    isModalOpen: useRadux((state) => uiSelectors.getModalOpen(state)),
    activeModal: useRadux((state) => uiSelectors.getActiveModal(state)),
    isLoading: useRadux((state) => uiSelectors.getLoading(state)),
    toast: useRadux((state) => uiSelectors.getToast(state)),
    theme: useRadux((state) => uiSelectors.getTheme(state)),
    sidebarOpen: useRadux((state) => uiSelectors.getSidebarOpen(state)),
    
    // Actions
    setMobileMenu: (isOpen) => dispatch(uiActions.setMobileMenu(isOpen)),
    setModal: (isOpen, modal) => dispatch(uiActions.setModal(isOpen, modal)),
    setLoading: (loading) => dispatch(uiActions.setLoading(loading)),
    setToast: (toast) => dispatch(uiActions.setToast(toast)),
    setTheme: (theme) => dispatch(uiActions.setTheme(theme)),
    setSidebar: (isOpen) => dispatch(uiActions.setSidebar(isOpen)),
    resetUI: () => dispatch(uiActions.resetUI()),
    showSuccessToast: (message) => dispatch(uiActions.setToast({ message, type: 'success' })),
    showErrorToast: (message) => dispatch(uiActions.setToast({ message, type: 'error' })),
    showWarningToast: (message) => dispatch(uiActions.setToast({ message, type: 'warning' })),
    showInfoToast: (message) => dispatch(uiActions.setToast({ message, type: 'info' })),
  };
};

// Custom hook for language state
export const useLanguage = () => {
  const dispatch = useRadux();
  
  return {
    // State
    currentLanguage: useRadux((state) => languageSelectors.getCurrentLanguage(state)),
    availableLanguages: useRadux((state) => languageSelectors.getAvailableLanguages(state)),
    translations: useRadux((state) => languageSelectors.getTranslations(state)),
    isLoading: useRadux((state) => languageSelectors.getLoading(state)),
    error: useRadux((state) => languageSelectors.getError(state)),
    
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
  const dispatch = useRadux();
  
  return {
    // State
    isAuthenticated: useRadux((state) => userSelectors.getAuthenticated(state)),
    user: useRadux((state) => userSelectors.getUser(state)),
    preferences: useRadux((state) => userSelectors.getPreferences(state)),
    learningProgress: useRadux((state) => userSelectors.getLearningProgress(state)),
    communityActivity: useRadux((state) => userSelectors.getCommunityActivity(state)),
    isLoading: useRadux((state) => userSelectors.getLoading(state)),
    error: useRadux((state) => userSelectors.getError(state)),
    
    // Computed state
    userName: useRadux((state) => userSelectors.getUserName(state)),
    userEmail: useRadux((state) => userSelectors.getUserEmail(state)),
    userRole: useRadux((state) => userSelectors.getUserRole(state)),
    
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
