import { createSlice } from '@reduxjs/toolkit';

// Initial state for UI management
const initialState = {
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
};

// Create the UI slice
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Toolkit automatically generates action creators for each reducer function
    setMobileMenu: (state, action) => {
      state.isMobileMenuOpen = action.payload;
    },
    setModal: (state, action) => {
      state.isModalOpen = action.payload.isOpen;
      state.activeModal = action.payload.modal;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setToast: (state, action) => {
      state.toast = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    setSearch: (state, action) => {
      state.isSearchOpen = action.payload;
    },
    setFilter: (state, action) => {
      state.isFilterOpen = action.payload;
    },
    setSort: (state, action) => {
      state.isSortOpen = action.payload;
    },
    setViewMode: (state, action) => {
      state.isViewMode = action.payload;
    },
    setSortBy: (state, action) => {
      state.isSortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.isSortOrder = action.payload;
    },
    setFilterBy: (state, action) => {
      state.isFilterBy = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.isSearchTerm = action.payload;
    },
    setPage: (state, action) => {
      state.isPage = action.payload;
    },
    setPerPage: (state, action) => {
      state.isPerPage = action.payload;
    },
    setTotalItems: (state, action) => {
      state.isTotalItems = action.payload;
    },
    setTotalPages: (state, action) => {
      state.isTotalPages = action.payload;
    },
    setHasNextPage: (state, action) => {
      state.isHasNextPage = action.payload;
    },
    setHasPrevPage: (state, action) => {
      state.isHasPrevPage = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.isCurrentPage = action.payload;
    },
    resetUI: () => initialState,
  },
});

export const uiActions = {
  ...uiSlice.actions,
};
export const {
  setMobileMenu,
  setModal,
  setLoading,
  setToast,
  setTheme,
  setSidebar,
  setSearch,
  setFilter,
  setSort,
  setViewMode,
  setSortBy,
  setSortOrder,
  setFilterBy,
  setSearchTerm,
  setPage,
  setPerPage,
  setTotalItems,
  setTotalPages,
  setHasNextPage,
  setHasPrevPage,
  setCurrentPage,
  resetUI,
} = uiSlice.actions;

// Selectors
export const uiSelectors = {
  getMobileMenuOpen: (state) => state.ui.isMobileMenuOpen,
  getModalOpen: (state) => state.ui.isModalOpen,
  getActiveModal: (state) => state.ui.activeModal,
  getLoading: (state) => state.ui.isLoading,
  getToast: (state) => state.ui.toast,
  getTheme: (state) => state.ui.theme,
  getSidebarOpen: (state) => state.ui.isSidebarOpen,
  getSearchOpen: (state) => state.ui.isSearchOpen,
  getFilterOpen: (state) => state.ui.isFilterOpen,
  getSortOpen: (state) => state.ui.isSortOpen,
  getViewMode: (state) => state.ui.isViewMode,
  getSortBy: (state) => state.ui.isSortBy,
  getSortOrder: (state) => state.ui.isSortOrder,
  getFilterBy: (state) => state.ui.isFilterBy,
  getSearchTerm: (state) => state.ui.isSearchTerm,
  getPage: (state) => state.ui.isPage,
  getPerPage: (state) => state.ui.isPerPage,
  getTotalItems: (state) => state.ui.isTotalItems,
  getTotalPages: (state) => state.ui.isTotalPages,
  getHasNextPage: (state) => state.ui.isHasNextPage,
  getHasPrevPage: (state) => state.ui.isHasPrevPage,
  getCurrentPage: (state) => state.ui.isCurrentPage,
};

// Export the reducer as default for store configuration
export default uiSlice.reducer;