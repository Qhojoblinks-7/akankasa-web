import { createSlice } from '@reduxjs/toolkit';

// Initial state for user management
const initialState = {
  isAuthenticated: false,
  user: null,
  preferences: {},
  learningProgress: {},
  communityActivity: {},
  isLoading: false,
  error: null,
};

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Reducers that directly set the state
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setPreferences: (state, action) => {
      state.preferences = action.payload;
    },
    setLearningProgress: (state, action) => {
      state.learningProgress = action.payload;
    },
    setCommunityActivity: (state, action) => {
      state.communityActivity = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    // Reducers that update nested state
    updatePreference: (state, action) => {
      const { key, value } = action.payload;
      state.preferences[key] = value;
    },
    updateLearningProgress: (state, action) => {
      const { key, value } = action.payload;
      state.learningProgress[key] = value;
    },
    updateCommunityActivity: (state, action) => {
      const { key, value } = action.payload;
      state.communityActivity[key] = value;
    },
    // Reducers for logout and reset
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    resetUser: () => initialState,
  },
});

// Selectors
export const userSelectors = {
  getAuthenticated: (state) => state.user.isAuthenticated,
  getUser: (state) => state.user.user,
  getPreferences: (state) => state.user.preferences,
  getLearningProgress: (state) => state.user.learningProgress,
  getCommunityActivity: (state) => state.user.communityActivity,
  getLoading: (state) => state.user.isLoading,
  getError: (state) => state.user.error,
  
  // Computed selectors
  getPreference: (state, key) => state.user.preferences[key],
  getLearningProgressItem: (state, key) => state.user.learningProgress[key],
  getCommunityActivityItem: (state, key) => state.user.communityActivity[key],
  
  getUserName: (state) => state.user.user?.name || 'Guest',
  getUserEmail: (state) => state.user.user?.email || '',
  getUserRole: (state) => state.user.user?.role || 'guest',
};

export const userActions = {
  ...userSlice.actions,
};
export const {
  setAuthenticated,
  setUser,
  setPreferences,
  setLearningProgress,
  setCommunityActivity,
  setLoading,
  setError,
  updatePreference,
  updateLearningProgress,
  updateCommunityActivity,
  logout,
  resetUser,
} = userSlice.actions;

export default userSlice.reducer;