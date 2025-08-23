import { createStore } from 'radux';
import cultureReducer from './slices/cultureSlice';
import uiReducer from './slices/uiSlice';
import languageReducer from './slices/languageSlice';
import userReducer from './slices/userSlice';

// Combine reducers manually since Radux v0.6.4 doesn't have combineReducers
const rootReducer = (state = {}, action) => {
  return {
    culture: cultureReducer(state.culture, action),
    ui: uiReducer(state.ui, action),
    language: languageReducer(state.language, action),
    user: userReducer(state.user, action),
  };
};

// Create the store
export const store = createStore(rootReducer, {
  // Initial state
  culture: {
    traditions: [],
    history: [],
    symbols: [],
    activeSection: 'traditions',
    selectedItem: null,
    selectedItemType: null,
    selectedRegion: 'all',
    searchTerm: '',
    isLoading: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 12,
    totalItems: 0,
  },
  ui: {
    isMobileMenuOpen: false,
    isModalOpen: false,
    activeModal: null,
    isLoading: false,
    toast: null,
    theme: 'light',
    isSidebarOpen: false,
    isSearchOpen: false,
    isFilterOpen: false,
    isSortOpen: false,
    isViewMode: 'grid',
    isSortBy: 'name',
    isSortOrder: 'asc',
    isFilterBy: 'all',
    isSearchTerm: '',
    isPage: 1,
    isPerPage: 12,
    isTotalItems: 0,
    isTotalPages: 0,
    isHasNextPage: false,
    isHasPrevPage: false,
    isCurrentPage: 1,
    isPerPageOptions: [12, 24, 48, 96],
    isSortOptions: ['name', 'date', 'popularity', 'relevance'],
    isFilterOptions: ['all', 'featured', 'popular', 'recent', 'trending'],
    isViewModeOptions: ['grid', 'list', 'table'],
    isSortOrderOptions: ['asc', 'desc'],
    isThemeOptions: ['light', 'dark', 'auto'],
    isLanguageOptions: ['en', 'tw'],
    isCurrencyOptions: ['USD', 'EUR', 'GBP', 'JPY', 'CNY'],
    isTimezoneOptions: ['UTC', 'EST', 'PST', 'GMT', 'CET'],
    isDateFormatOptions: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'],
    isTimeFormatOptions: ['12h', '24h'],
    isNumberFormatOptions: ['1,234.56', '1.234,56', '1 234.56'],
    isPhoneFormatOptions: ['+1 (234) 567-8900', '+1 234 567 8900', '+1-234-567-8900'],
    isAddressFormatOptions: ['Street, City, State ZIP', 'Street\nCity, State ZIP', 'Street, City\nState ZIP'],
    isNameFormatOptions: ['First Last', 'Last, First', 'First M. Last'],
    isCompanyFormatOptions: ['Company Name', 'Company Name, Inc.', 'Company Name LLC'],
    isWebsiteFormatOptions: ['https://example.com', 'www.example.com', 'example.com'],
    isEmailFormatOptions: ['user@example.com', 'user+tag@example.com', 'user@subdomain.example.com'],
    isSocialMediaFormatOptions: ['@username', 'username', 'https://twitter.com/username'],
    isPhoneNumberFormatOptions: ['+1 (234) 567-8900', '+1 234 567 8900', '+1-234-567-8900'],
    isAddressFormatOptions: ['Street, City, State ZIP', 'Street\nCity, State ZIP', 'Street, City\nState ZIP'],
    isNameFormatOptions: ['First Last', 'Last, First', 'First M. Last'],
    isCompanyFormatOptions: ['Company Name', 'Company Name, Inc.', 'Company Name LLC'],
    isWebsiteFormatOptions: ['https://example.com', 'www.example.com', 'example.com'],
    isEmailFormatOptions: ['user@example.com', 'user+tag@example.com', 'user@subdomain.example.com'],
    isSocialMediaFormatOptions: ['@username', 'username', 'https://twitter.com/username'],
  },
  language: {
    currentLanguage: 'en',
    availableLanguages: ['en', 'tw'],
    translations: {},
    isLoading: false,
    error: null,
  },
  user: {
    isAuthenticated: false,
    user: null,
    preferences: {},
    learningProgress: {},
    communityActivity: {},
    isLoading: false,
    error: null,
  },
});

export default store;