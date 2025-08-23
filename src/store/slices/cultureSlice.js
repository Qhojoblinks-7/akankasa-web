import { createSlice } from 'radux';
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

// Culture slice
export const cultureSlice = createSlice({
  name: 'culture',
  initialState,
  reducers: {
    // Set active section (traditions, history, symbols)
    setActiveSection: (state, action) => {
      state.activeSection = action.payload;
      // Reset selection when changing sections
      state.selectedItem = null;
      state.selectedItemType = null;
    },

    // Set selected item for detail view
    setSelectedItem: (state, action) => {
      const { item, type } = action.payload;
      state.selectedItem = item;
      state.selectedItemType = type;
    },

    // Set selected item type
    setSelectedItemType: (state, action) => {
      state.selectedItemType = action.payload;
    },

    // Set region filter
    setRegionFilter: (state, action) => {
      state.selectedRegion = action.payload;
      state.currentPage = 1; // Reset to first page when filtering
    },

    // Set search term
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; // Reset to first page when searching
    },

    // Set loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // Set error state
    setError: (state, action) => {
      state.error = action.payload;
    },

    // Set current page for pagination
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    // Load cultural data (placeholder for future API integration)
    loadCulturalData: (state) => {
      state.isLoading = true;
      state.error = null;
      
      try {
        // For now, use mock data. In production, this would be an API call
        state.traditions = culturalData.traditions || [];
        state.history = culturalData.history || [];
        state.symbols = culturalData.symbols || [];
        state.totalItems = (culturalData.traditions?.length || 0) + 
                          (culturalData.history?.length || 0) + 
                          (culturalData.symbols?.length || 0);
      } catch (error) {
        state.error = error.message;
      } finally {
        state.isLoading = false;
      }
    },

    // Clear current selection
    clearSelection: (state) => {
      state.selectedItem = null;
      state.selectedItemType = null;
    },

    // Reset all filters
    resetFilters: (state) => {
      state.selectedRegion = 'all';
      state.searchTerm = '';
      state.currentPage = 1;
    },
  },
});

// Export actions
export const {
  setActiveSection,
  setSelectedItem,
  setSelectedItemType,
  setRegionFilter,
  setSearchTerm,
  setLoading,
  setError,
  setCurrentPage,
  loadCulturalData,
  clearSelection,
  resetFilters,
} = cultureSlice.actions;

// Selectors for easy state access
export const selectCulture = (state) => state.culture;

export const selectActiveSection = (state) => state.culture.activeSection;
export const selectSelectedItem = (state) => state.culture.selectedItem;
export const selectSelectedItemType = (state) => state.culture.selectedItemType;
export const selectRegionFilter = (state) => state.culture.selectedRegion;
export const selectSearchTerm = (state) => state.culture.searchTerm;
export const selectIsLoading = (state) => state.culture.isLoading;
export const selectError = (state) => state.culture.error;
export const selectCurrentPage = (state) => state.culture.currentPage;
export const selectTotalItems = (state) => state.culture.totalItems;

// Computed selectors
export const selectFilteredContent = (state) => {
  const { activeSection, traditions, history, symbols, selectedRegion, searchTerm } = state.culture;
  
  let content = [];
  switch (activeSection) {
    case 'traditions':
      content = traditions;
      break;
    case 'history':
      content = history;
      break;
    case 'symbols':
      content = symbols;
      break;
    default:
      content = [];
  }

  // Apply region filter
  if (selectedRegion !== 'all') {
    content = content.filter(item => item.region === selectedRegion);
  }

  // Apply search filter
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    content = content.filter(item => 
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      item.content.toLowerCase().includes(searchLower) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchLower)))
    );
  }

  return content;
};

export const selectAvailableRegions = (state) => {
  const { activeSection, traditions, history, symbols } = state.culture;
  
  let content = [];
  switch (activeSection) {
    case 'traditions':
      content = traditions;
      break;
    case 'history':
      content = history;
      break;
    case 'symbols':
      content = symbols;
      break;
    default:
      content = [];
  }

  const regions = ['all', ...new Set(content.map(item => item.region).filter(Boolean))];
  return regions;
};

export const selectItemById = (state, id, type) => {
  const { traditions, history, symbols } = state.culture;
  
  switch (type) {
    case 'tradition':
      return traditions.find(item => item.id === parseInt(id));
    case 'history':
      return history.find(item => item.id === parseInt(id));
    case 'symbol':
      return symbols.find(item => item.id === parseInt(id));
    default:
      return null;
  }
};

// Async action creators (for future API integration)
export const fetchCulturalData = () => async (dispatch) => {
  dispatch(setLoading(true));
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In production, this would be:
    // const response = await fetch('/api/cultural-data');
    // const data = await response.json();
    
    dispatch(loadCulturalData());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const fetchItemById = (id, type) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // In production, this would be:
    // const response = await fetch(`/api/${type}/${id}`);
    // const item = await response.json();
    
    const state = getState();
    const item = selectItemById(state, id, type);
    
    if (item) {
      dispatch(setSelectedItem({ item, type }));
    } else {
      dispatch(setError('Item not found'));
    }
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};