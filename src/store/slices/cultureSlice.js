import { createSlice } from '@reduxjs/toolkit';

// Initial state for cultural content management
const initialState = {
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
};

// Create the culture slice
const cultureSlice = createSlice({
  name: 'culture',
  initialState,
  reducers: {
    // Reducers that set the state
    setCulturalData: (state, action) => {
      state.traditions = action.payload.traditions;
      state.history = action.payload.history;
      state.symbols = action.payload.symbols;
    },
    setActiveSection: (state, action) => {
      state.activeSection = action.payload;
    },
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload.item;
      state.selectedItemType = action.payload.type;
    },
    setSelectedRegion: (state, action) => {
      state.selectedRegion = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
    },

    // Reducers for asynchronous data fetching states
    loadCulturalDataPending: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loadCulturalDataSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.traditions = action.payload.traditions;
      state.history = action.payload.history;
      state.symbols = action.payload.symbols;
    },
    loadCulturalDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Reset reducer
    resetCulture: () => initialState,
    
    // Simple load action that can be used directly
    loadCulturalData: (state) => {
      state.isLoading = true;
      state.error = null;
    },
  },
});

// Selectors
export const cultureSelectors = {
  getCulturalData: (state) => state.culture.culturalData,
  getActiveSection: (state) => state.culture.activeSection,
  getSelectedItem: (state) => state.culture.selectedItem,
  getSelectedItemType: (state) => state.culture.selectedItemType,
  getSelectedRegion: (state) => state.culture.selectedRegion,
  getSearchTerm: (state) => state.culture.searchTerm,
  getLoading: (state) => state.culture.isLoading,
  getError: (state) => state.culture.error,
  getCurrentPage: (state) => state.culture.currentPage,
  getItemsPerPage: (state) => state.culture.itemsPerPage,
  getTotalItems: (state) => state.culture.totalItems,
  
  // Computed selectors for filtered data
  getFilteredTraditions: (state) => {
    const { traditions, selectedRegion, searchTerm } = state.culture;
    let filtered = traditions || [];
    
    if (selectedRegion !== 'all') {
      filtered = filtered.filter(item => item.region === selectedRegion);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.name?.toLowerCase().includes(term) || 
        item.description?.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  },
  
  getFilteredHistory: (state) => {
    const { history, selectedRegion, searchTerm } = state.culture;
    let filtered = history || [];
    
    if (selectedRegion !== 'all') {
      filtered = filtered.filter(item => item.region === selectedRegion);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.title?.toLowerCase().includes(term) || 
        item.description?.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  },
  
  getFilteredSymbols: (state) => {
    const { symbols, selectedRegion, searchTerm } = state.culture;
    let filtered = symbols || [];
    
    if (selectedRegion !== 'all') {
      filtered = filtered.filter(item => item.region === selectedRegion);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.name?.toLowerCase().includes(term) || 
        item.meaning?.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  },
  
  // Get available regions from all cultural data
  getAvailableRegions: (state) => {
    const { traditions, history, symbols } = state.culture;
    const allItems = [...(traditions || []), ...(history || []), ...(symbols || [])];
    const regions = new Set(allItems.map(item => item.region).filter(Boolean));
    return ['all', ...Array.from(regions)].sort();
  },
  
  // Get filtered content based on active section
  getFilteredContent: (state) => {
    const { activeSection } = state.culture;
    
    switch (activeSection) {
      case 'traditions':
        return cultureSelectors.getFilteredTraditions(state);
      case 'history':
        return cultureSelectors.getFilteredHistory(state);
      case 'symbols':
        return cultureSelectors.getFilteredSymbols(state);
      default:
        return [];
    }
  },
};

export const cultureActions = {
  ...cultureSlice.actions,
};
export const {
  setCulturalData,
  setActiveSection,
  setSelectedItem,
  setSelectedRegion,
  setSearchTerm,
  setLoading,
  setError,
  setCurrentPage,
  setTotalItems,
  loadCulturalDataPending,
  loadCulturalDataSuccess,
  loadCulturalDataFailure,
  resetCulture,
  loadCulturalData, // Add this line
} = cultureSlice.actions;

export default cultureSlice.reducer;