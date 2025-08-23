// Culture slice using Radux v0.6.4 compatible approach
import { culturalData } from '../../data/mockData';

// Initial state for culture management
const initialState = {
  // Data
  traditions: [],
  history: [],
  symbols: [],
  
  // UI State
  activeSection: 'traditions',
  selectedItem: null,
  selectedItemType: null, // 'tradition', 'history', 'symbol'
  
  // Filters
  selectedRegion: 'all',
  searchTerm: '',
  
  // Loading states
  isLoading: false,
  error: null,
  
  // Pagination (for future backend integration)
  currentPage: 1,
  itemsPerPage: 12,
  totalItems: 0,
};

// Action types
export const CULTURE_ACTIONS = {
  SET_ACTIVE_SECTION: 'culture/setActiveSection',
  SET_SELECTED_ITEM: 'culture/setSelectedItem',
  SET_SELECTED_ITEM_TYPE: 'culture/setSelectedItemType',
  SET_REGION_FILTER: 'culture/setRegionFilter',
  SET_SEARCH_TERM: 'culture/setSearchTerm',
  SET_LOADING: 'culture/setLoading',
  SET_ERROR: 'culture/setError',
  SET_CURRENT_PAGE: 'culture/setCurrentPage',
  LOAD_CULTURAL_DATA: 'culture/loadCulturalData',
  CLEAR_SELECTION: 'culture/clearSelection',
  RESET_FILTERS: 'culture/resetFilters',
};

// Culture reducer
export const cultureReducer = (state = initialState, action) => {
  switch (action.type) {
    // Set active section (traditions, history, symbols)
    case CULTURE_ACTIONS.SET_ACTIVE_SECTION:
      return {
        ...state,
        activeSection: action.payload,
        selectedItem: null,
        selectedItemType: null,
      };

    // Set selected item for detail view
    case CULTURE_ACTIONS.SET_SELECTED_ITEM:
      return {
        ...state,
        selectedItem: action.payload.item,
        selectedItemType: action.payload.type,
      };

    // Set selected item type
    case CULTURE_ACTIONS.SET_SELECTED_ITEM_TYPE:
      return {
        ...state,
        selectedItemType: action.payload,
      };

    // Set region filter
    case CULTURE_ACTIONS.SET_REGION_FILTER:
      return {
        ...state,
        selectedRegion: action.payload,
        currentPage: 1, // Reset to first page when filtering
      };

    // Set search term
    case CULTURE_ACTIONS.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
        currentPage: 1, // Reset to first page when searching
      };

    // Set loading state
    case CULTURE_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    // Set error state
    case CULTURE_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    // Set current page for pagination
    case CULTURE_ACTIONS.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    // Load cultural data (placeholder for future API integration)
    case CULTURE_ACTIONS.LOAD_CULTURAL_DATA:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    // Clear selection
    case CULTURE_ACTIONS.CLEAR_SELECTION:
      return {
        ...state,
        selectedItem: null,
        selectedItemType: null,
      };

    // Reset filters
    case CULTURE_ACTIONS.RESET_FILTERS:
      return {
        ...state,
        selectedRegion: 'all',
        searchTerm: '',
        currentPage: 1,
      };

    default:
      return state;
  }
};

// Action creators
export const cultureActions = {
  setActiveSection: (section) => ({
    type: CULTURE_ACTIONS.SET_ACTIVE_SECTION,
    payload: section,
  }),

  setSelectedItem: (item, type) => ({
    type: CULTURE_ACTIONS.SET_SELECTED_ITEM,
    payload: { item, type },
  }),

  setSelectedItemType: (type) => ({
    type: CULTURE_ACTIONS.SET_SELECTED_ITEM_TYPE,
    payload: type,
  }),

  setRegionFilter: (region) => ({
    type: CULTURE_ACTIONS.SET_REGION_FILTER,
    payload: region,
  }),

  setSearchTerm: (term) => ({
    type: CULTURE_ACTIONS.SET_SEARCH_TERM,
    payload: term,
  }),

  setLoading: (loading) => ({
    type: CULTURE_ACTIONS.SET_LOADING,
    payload: loading,
  }),

  setError: (error) => ({
    type: CULTURE_ACTIONS.SET_ERROR,
    payload: error,
  }),

  setCurrentPage: (page) => ({
    type: CULTURE_ACTIONS.SET_CURRENT_PAGE,
    payload: page,
  }),

  loadCulturalData: () => ({
    type: CULTURE_ACTIONS.LOAD_CULTURAL_DATA,
  }),

  clearSelection: () => ({
    type: CULTURE_ACTIONS.CLEAR_SELECTION,
  }),

  resetFilters: () => ({
    type: CULTURE_ACTIONS.RESET_FILTERS,
  }),
};

// Selectors
export const cultureSelectors = {
  getActiveSection: (state) => state.culture.activeSection,
  getSelectedItem: (state) => state.culture.selectedItem,
  getSelectedItemType: (state) => state.culture.selectedItemType,
  getRegionFilter: (state) => state.culture.selectedRegion,
  getSearchTerm: (state) => state.culture.searchTerm,
  getLoading: (state) => state.culture.isLoading,
  getError: (state) => state.culture.error,
  getCurrentPage: (state) => state.culture.currentPage,
  getItemsPerPage: (state) => state.culture.itemsPerPage,
  getTotalItems: (state) => state.culture.totalItems,
  
  // Computed selectors
  getFilteredTraditions: (state) => {
    const { traditions, selectedRegion, searchTerm } = state.culture;
    let filtered = traditions;
    
    if (selectedRegion !== 'all') {
      filtered = filtered.filter(tradition => tradition.region === selectedRegion);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(tradition => 
        tradition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tradition.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  },
  
  getFilteredHistory: (state) => {
    const { history, selectedRegion, searchTerm } = state.culture;
    let filtered = history;
    
    if (selectedRegion !== 'all') {
      filtered = filtered.filter(item => item.region === selectedRegion);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  },
  
  getFilteredSymbols: (state) => {
    const { symbols, selectedRegion, searchTerm } = state.culture;
    let filtered = symbols;
    
    if (selectedRegion !== 'all') {
      filtered = filtered.filter(symbol => symbol.region === selectedRegion);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(symbol => 
        symbol.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        symbol.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  },
};

// Export the reducer as default for store configuration
export default cultureReducer;