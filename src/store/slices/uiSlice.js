// UI slice using Radux v0.6.4 compatible approach

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

// Action types
export const UI_ACTIONS = {
  SET_MOBILE_MENU: 'ui/setMobileMenu',
  SET_MODAL: 'ui/setModal',
  SET_LOADING: 'ui/setLoading',
  SET_TOAST: 'ui/setToast',
  SET_THEME: 'ui/setTheme',
  SET_SIDEBAR: 'ui/setSidebar',
  SET_SEARCH: 'ui/setSearch',
  SET_FILTER: 'ui/setFilter',
  SET_SORT: 'ui/setSort',
  SET_VIEW_MODE: 'ui/setViewMode',
  SET_SORT_BY: 'ui/setSortBy',
  SET_SORT_ORDER: 'ui/setSortOrder',
  SET_FILTER_BY: 'ui/setFilterBy',
  SET_SEARCH_TERM: 'ui/setSearchTerm',
  SET_PAGE: 'ui/setPage',
  SET_PER_PAGE: 'ui/setPerPage',
  SET_TOTAL_ITEMS: 'ui/setTotalItems',
  SET_TOTAL_PAGES: 'ui/setTotalPages',
  SET_HAS_NEXT_PAGE: 'ui/setHasNextPage',
  SET_HAS_PREV_PAGE: 'ui/setHasPrevPage',
  SET_CURRENT_PAGE: 'ui/setCurrentPage',
  RESET_UI: 'ui/resetUI',
};

// UI reducer
export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case UI_ACTIONS.SET_MOBILE_MENU:
      return {
        ...state,
        isMobileMenuOpen: action.payload,
      };

    case UI_ACTIONS.SET_MODAL:
      return {
        ...state,
        isModalOpen: action.payload.isOpen,
        activeModal: action.payload.modal,
      };

    case UI_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case UI_ACTIONS.SET_TOAST:
      return {
        ...state,
        toast: action.payload,
      };

    case UI_ACTIONS.SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };

    case UI_ACTIONS.SET_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: action.payload,
      };

    case UI_ACTIONS.SET_SEARCH:
      return {
        ...state,
        isSearchOpen: action.payload,
      };

    case UI_ACTIONS.SET_FILTER:
      return {
        ...state,
        isFilterOpen: action.payload,
      };

    case UI_ACTIONS.SET_SORT:
      return {
        ...state,
        isSortOpen: action.payload,
      };

    case UI_ACTIONS.SET_VIEW_MODE:
      return {
        ...state,
        isViewMode: action.payload,
      };

    case UI_ACTIONS.SET_SORT_BY:
      return {
        ...state,
        isSortBy: action.payload,
      };

    case UI_ACTIONS.SET_SORT_ORDER:
      return {
        ...state,
        isSortOrder: action.payload,
      };

    case UI_ACTIONS.SET_FILTER_BY:
      return {
        ...state,
        isFilterBy: action.payload,
      };

    case UI_ACTIONS.SET_SEARCH_TERM:
      return {
        ...state,
        isSearchTerm: action.payload,
      };

    case UI_ACTIONS.SET_PAGE:
      return {
        ...state,
        isPage: action.payload,
      };

    case UI_ACTIONS.SET_PER_PAGE:
      return {
        ...state,
        isPerPage: action.payload,
      };

    case UI_ACTIONS.SET_TOTAL_ITEMS:
      return {
        ...state,
        isTotalItems: action.payload,
      };

    case UI_ACTIONS.SET_TOTAL_PAGES:
      return {
        ...state,
        isTotalPages: action.payload,
      };

    case UI_ACTIONS.SET_HAS_NEXT_PAGE:
      return {
        ...state,
        isHasNextPage: action.payload,
      };

    case UI_ACTIONS.SET_HAS_PREV_PAGE:
      return {
        ...state,
        isHasPrevPage: action.payload,
      };

    case UI_ACTIONS.SET_CURRENT_PAGE:
      return {
        ...state,
        isCurrentPage: action.payload,
      };

    case UI_ACTIONS.RESET_UI:
      return initialState;

    default:
      return state;
  }
};

// Action creators
export const uiActions = {
  setMobileMenu: (isOpen) => ({
    type: UI_ACTIONS.SET_MOBILE_MENU,
    payload: isOpen,
  }),

  setModal: (isOpen, modal = null) => ({
    type: UI_ACTIONS.SET_MODAL,
    payload: { isOpen, modal },
  }),

  setLoading: (loading) => ({
    type: UI_ACTIONS.SET_LOADING,
    payload: loading,
  }),

  setToast: (toast) => ({
    type: UI_ACTIONS.SET_TOAST,
    payload: toast,
  }),

  setTheme: (theme) => ({
    type: UI_ACTIONS.SET_THEME,
    payload: theme,
  }),

  setSidebar: (isOpen) => ({
    type: UI_ACTIONS.SET_SIDEBAR,
    payload: isOpen,
  }),

  setSearch: (isOpen) => ({
    type: UI_ACTIONS.SET_SEARCH,
    payload: isOpen,
  }),

  setFilter: (isOpen) => ({
    type: UI_ACTIONS.SET_FILTER,
    payload: isOpen,
  }),

  setSort: (isOpen) => ({
    type: UI_ACTIONS.SET_SORT,
    payload: isOpen,
  }),

  setViewMode: (mode) => ({
    type: UI_ACTIONS.SET_VIEW_MODE,
    payload: mode,
  }),

  setSortBy: (sortBy) => ({
    type: UI_ACTIONS.SET_SORT_BY,
    payload: sortBy,
  }),

  setSortOrder: (order) => ({
    type: UI_ACTIONS.SET_SORT_ORDER,
    payload: order,
  }),

  setFilterBy: (filter) => ({
    type: UI_ACTIONS.SET_FILTER_BY,
    payload: filter,
  }),

  setSearchTerm: (term) => ({
    type: UI_ACTIONS.SET_SEARCH_TERM,
    payload: term,
  }),

  setPage: (page) => ({
    type: UI_ACTIONS.SET_PAGE,
    payload: page,
  }),

  setPerPage: (perPage) => ({
    type: UI_ACTIONS.SET_PER_PAGE,
    payload: perPage,
  }),

  setTotalItems: (total) => ({
    type: UI_ACTIONS.SET_TOTAL_ITEMS,
    payload: total,
  }),

  setTotalPages: (total) => ({
    type: UI_ACTIONS.SET_TOTAL_PAGES,
    payload: total,
  }),

  setHasNextPage: (hasNext) => ({
    type: UI_ACTIONS.SET_HAS_NEXT_PAGE,
    payload: hasNext,
  }),

  setHasPrevPage: (hasPrev) => ({
    type: UI_ACTIONS.SET_HAS_PREV_PAGE,
    payload: hasPrev,
  }),

  setCurrentPage: (page) => ({
    type: UI_ACTIONS.SET_CURRENT_PAGE,
    payload: page,
  }),

  resetUI: () => ({
    type: UI_ACTIONS.RESET_UI,
  }),
};

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
export default uiReducer;