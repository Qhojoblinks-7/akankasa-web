import { createSlice } from 'radux';

// Initial state for UI management
const initialState = {
  // Modal states
  isContributeModalOpen: false,
  isDetailModalOpen: false,
  
  // Navigation states
  isMobileMenuOpen: false,
  isSidebarOpen: false,
  
  // Loading states
  isPageLoading: false,
  loadingMessage: '',
  
  // Toast/notification states
  toast: {
    isVisible: false,
    message: '',
    type: 'info', // 'info', 'success', 'warning', 'error'
    duration: 5000,
  },
  
  // Theme and appearance
  theme: 'light', // 'light', 'dark'
  isHighContrast: false,
  isReducedMotion: false,
  
  // Responsive states
  isMobile: false,
  isTablet: false,
  isDesktop: false,
  
  // Scroll position tracking
  scrollPosition: 0,
  isScrolled: false,
  
  // Focus management
  lastFocusedElement: null,
  isKeyboardNavigation: false,
};

// Action types
export const UI_ACTIONS = {
  SET_CONTRIBUTE_MODAL: 'ui/setContributeModal',
  SET_DETAIL_MODAL: 'ui/setDetailModal',
  SET_MOBILE_MENU: 'ui/setMobileMenu',
  SET_SIDEBAR: 'ui/setSidebar',
  SET_PAGE_LOADING: 'ui/setPageLoading',
  SET_LOADING_MESSAGE: 'ui/setLoadingMessage',
  SHOW_TOAST: 'ui/showToast',
  HIDE_TOAST: 'ui/hideToast',
  SET_THEME: 'ui/setTheme',
  SET_HIGH_CONTRAST: 'ui/setHighContrast',
  SET_REDUCED_MOTION: 'ui/setReducedMotion',
  SET_RESPONSIVE_STATE: 'ui/setResponsiveState',
  SET_SCROLL_POSITION: 'ui/setScrollPosition',
  SET_SCROLLED_STATE: 'ui/setScrolledState',
  SET_LAST_FOCUSED: 'ui/setLastFocused',
  SET_KEYBOARD_NAVIGATION: 'ui/setKeyboardNavigation',
  RESET_UI_STATE: 'ui/resetUIState',
};

// UI slice
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Modal controls
    setContributeModal: (state, action) => {
      state.isContributeModalOpen = action.payload;
    },

    setDetailModal: (state, action) => {
      state.isDetailModalOpen = action.payload;
    },

    // Navigation controls
    setMobileMenu: (state, action) => {
      state.isMobileMenuOpen = action.payload;
    },

    setSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },

    // Loading controls
    setPageLoading: (state, action) => {
      state.isPageLoading = action.payload;
    },

    setLoadingMessage: (state, action) => {
      state.loadingMessage = action.payload;
    },

    // Toast controls
    showToast: (state, action) => {
      const { message, type = 'info', duration = 5000 } = action.payload;
      state.toast = {
        isVisible: true,
        message,
        type,
        duration,
      };
    },

    hideToast: (state) => {
      state.toast.isVisible = false;
    },

    // Theme controls
    setTheme: (state, action) => {
      state.theme = action.payload;
      // Apply theme to document
      document.documentElement.setAttribute('data-theme', action.payload);
    },

    setHighContrast: (state, action) => {
      state.isHighContrast = action.payload;
      // Apply high contrast to document
      document.documentElement.setAttribute('data-high-contrast', action.payload);
    },

    setReducedMotion: (state, action) => {
      state.isReducedMotion = action.payload;
      // Apply reduced motion to document
      document.documentElement.setAttribute('data-reduced-motion', action.payload);
    },

    // Responsive state management
    setResponsiveState: (state, action) => {
      const { isMobile, isTablet, isDesktop } = action.payload;
      state.isMobile = isMobile;
      state.isTablet = isTablet;
      state.isDesktop = isDesktop;
    },

    // Scroll tracking
    setScrollPosition: (state, action) => {
      state.scrollPosition = action.payload;
    },

    setScrolledState: (state, action) => {
      state.isScrolled = action.payload;
    },

    // Focus management
    setLastFocused: (state, action) => {
      state.lastFocusedElement = action.payload;
    },

    setKeyboardNavigation: (state, action) => {
      state.isKeyboardNavigation = action.payload;
    },

    // Reset UI state
    resetUIState: (state) => {
      state.isContributeModalOpen = false;
      state.isDetailModalOpen = false;
      state.isMobileMenuOpen = false;
      state.isSidebarOpen = false;
      state.isPageLoading = false;
      state.loadingMessage = '';
      state.toast.isVisible = false;
    },
  },
});

// Export actions
export const {
  setContributeModal,
  setDetailModal,
  setMobileMenu,
  setSidebar,
  setPageLoading,
  setLoadingMessage,
  showToast,
  hideToast,
  setTheme,
  setHighContrast,
  setReducedMotion,
  setResponsiveState,
  setScrollPosition,
  setScrolledState,
  setLastFocused,
  setKeyboardNavigation,
  resetUIState,
} = uiSlice.actions;

// Selectors for easy state access
export const selectUI = (state) => state.ui;

export const selectIsContributeModalOpen = (state) => state.ui.isContributeModalOpen;
export const selectIsDetailModalOpen = (state) => state.ui.isDetailModalOpen;
export const selectIsMobileMenuOpen = (state) => state.ui.isMobileMenuOpen;
export const selectIsSidebarOpen = (state) => state.ui.isSidebarOpen;
export const selectIsPageLoading = (state) => state.ui.isPageLoading;
export const selectLoadingMessage = (state) => state.ui.loadingMessage;
export const selectToast = (state) => state.ui.toast;
export const selectTheme = (state) => state.ui.theme;
export const selectIsHighContrast = (state) => state.ui.isHighContrast;
export const selectIsReducedMotion = (state) => state.ui.isReducedMotion;
export const selectIsMobile = (state) => state.ui.isMobile;
export const selectIsTablet = (state) => state.ui.isTablet;
export const selectIsDesktop = (state) => state.ui.isDesktop;
export const selectScrollPosition = (state) => state.ui.scrollPosition;
export const selectIsScrolled = (state) => state.ui.isScrolled;
export const selectLastFocused = (state) => state.ui.lastFocusedElement;
export const selectIsKeyboardNavigation = (state) => state.ui.isKeyboardNavigation;

// Computed selectors
export const selectIsAnyModalOpen = (state) => 
  state.ui.isContributeModalOpen || state.ui.isDetailModalOpen;

export const selectIsAnyNavigationOpen = (state) => 
  state.ui.isMobileMenuOpen || state.ui.isSidebarOpen;

export const selectIsAnyOverlayOpen = (state) => 
  state.ui.isContributeModalOpen || 
  state.ui.isDetailModalOpen || 
  state.ui.isMobileMenuOpen || 
  state.ui.isSidebarOpen;

// Async action creators
export const initializeUI = () => async (dispatch) => {
  // Check user preferences
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;

  // Set initial theme
  dispatch(setTheme(prefersDark ? 'dark' : 'light'));
  dispatch(setReducedMotion(prefersReducedMotion));
  dispatch(setHighContrast(prefersHighContrast));

  // Set responsive state
  const updateResponsiveState = () => {
    const width = window.innerWidth;
    dispatch(setResponsiveState({
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024,
    }));
  };

  // Initial check
  updateResponsiveState();

  // Listen for resize events
  window.addEventListener('resize', updateResponsiveState);

  // Listen for scroll events
  const handleScroll = () => {
    const scrollY = window.scrollY;
    dispatch(setScrollPosition(scrollY));
    dispatch(setScrolledState(scrollY > 10));
  };

  window.addEventListener('scroll', handleScroll);

  // Listen for keyboard navigation
  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      dispatch(setKeyboardNavigation(true));
    }
  };

  const handleMouseDown = () => {
    dispatch(setKeyboardNavigation(false));
  };

  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('mousedown', handleMouseDown);

  // Return cleanup function
  return () => {
    window.removeEventListener('resize', updateResponsiveState);
    window.removeEventListener('scroll', handleScroll);
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('mousedown', handleMouseDown);
  };
};

export const showSuccessToast = (message) => (dispatch) => {
  dispatch(showToast({ message, type: 'success' }));
};

export const showErrorToast = (message) => (dispatch) => {
  dispatch(showToast({ message, type: 'error' }));
};

export const showWarningToast = (message) => (dispatch) => {
  dispatch(showToast({ message, type: 'warning' }));
};

export const showInfoToast = (message) => (dispatch) => {
  dispatch(showToast({ message, type: 'info' }));
};