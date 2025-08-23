import { createSlice } from 'radux';

// Initial state for user management
const initialState = {
  // Authentication state
  isAuthenticated: false,
  user: null,
  token: null,
  
  // User preferences
  preferences: {
    theme: 'light',
    language: 'en',
    notifications: true,
    emailUpdates: true,
    accessibility: {
      highContrast: false,
      reducedMotion: false,
      fontSize: 'medium', // 'small', 'medium', 'large'
    },
  },
  
  // Learning progress
  learningProgress: {
    completedLessons: [],
    vocabularyMastered: [],
    currentStreak: 0,
    totalStudyTime: 0,
    level: 'beginner', // 'beginner', 'intermediate', 'advanced'
  },
  
  // Community interactions
  communityActivity: {
    contributions: [],
    discussions: [],
    events: [],
    badges: [],
  },
  
  // Loading states
  isLoading: false,
  isUpdating: false,
  error: null,
  
  // Session management
  sessionExpiry: null,
  isSessionValid: true,
};

// Action types
export const USER_ACTIONS = {
  SET_AUTHENTICATION: 'user/setAuthentication',
  SET_USER: 'user/setUser',
  SET_TOKEN: 'user/setToken',
  SET_PREFERENCES: 'user/setPreferences',
  UPDATE_PREFERENCE: 'user/updatePreference',
  SET_LEARNING_PROGRESS: 'user/setLearningProgress',
  UPDATE_LEARNING_PROGRESS: 'user/updateLearningProgress',
  SET_COMMUNITY_ACTIVITY: 'user/setCommunityActivity',
  UPDATE_COMMUNITY_ACTIVITY: 'user/updateCommunityActivity',
  SET_LOADING: 'user/setLoading',
  SET_UPDATING: 'user/setUpdating',
  SET_ERROR: 'user/setError',
  SET_SESSION_EXPIRY: 'user/setSessionExpiry',
  SET_SESSION_VALID: 'user/setSessionValid',
  LOGOUT: 'user/logout',
  RESET_USER_STATE: 'user/resetUserState',
};

// User slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Set authentication state
    setAuthentication: (state, action) => {
      const { isAuthenticated, user, token } = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.user = user;
      state.token = token;
      
      // Store token in localStorage if provided
      if (token) {
        localStorage.setItem('akan-kasa-token', token);
      } else {
        localStorage.removeItem('akan-kasa-token');
      }
    },

    // Set user data
    setUser: (state, action) => {
      state.user = action.payload;
    },

    // Set authentication token
    setToken: (state, action) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem('akan-kasa-token', action.payload);
      } else {
        localStorage.removeItem('akan-kasa-token');
      }
    },

    // Set user preferences
    setPreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
      
      // Store preferences in localStorage
      localStorage.setItem('akan-kasa-preferences', JSON.stringify(state.preferences));
    },

    // Update specific preference
    updatePreference: (state, action) => {
      const { key, value } = action.payload;
      
      if (key.includes('.')) {
        // Handle nested preferences (e.g., 'accessibility.highContrast')
        const keys = key.split('.');
        let current = state.preferences;
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
      } else {
        state.preferences[key] = value;
      }
      
      // Store updated preferences
      localStorage.setItem('akan-kasa-preferences', JSON.stringify(state.preferences));
    },

    // Set learning progress
    setLearningProgress: (state, action) => {
      state.learningProgress = { ...state.learningProgress, ...action.payload };
    },

    // Update learning progress
    updateLearningProgress: (state, action) => {
      const { type, data } = action.payload;
      
      switch (type) {
        case 'completeLesson':
          if (!state.learningProgress.completedLessons.includes(data.lessonId)) {
            state.learningProgress.completedLessons.push(data.lessonId);
          }
          break;
          
        case 'masterVocabulary':
          if (!state.learningProgress.vocabularyMastered.includes(data.vocabularyId)) {
            state.learningProgress.vocabularyMastered.push(data.vocabularyId);
          }
          break;
          
        case 'updateStreak':
          state.learningProgress.currentStreak = data.streak;
          break;
          
        case 'addStudyTime':
          state.learningProgress.totalStudyTime += data.minutes;
          break;
          
        case 'updateLevel':
          state.learningProgress.level = data.level;
          break;
          
        default:
          break;
      }
    },

    // Set community activity
    setCommunityActivity: (state, action) => {
      state.communityActivity = { ...state.communityActivity, ...action.payload };
    },

    // Update community activity
    updateCommunityActivity: (state, action) => {
      const { type, data } = action.payload;
      
      switch (type) {
        case 'addContribution':
          state.communityActivity.contributions.unshift(data);
          break;
          
        case 'addDiscussion':
          state.communityActivity.discussions.unshift(data);
          break;
          
        case 'addEvent':
          state.communityActivity.events.unshift(data);
          break;
          
        case 'addBadge':
          if (!state.communityActivity.badges.includes(data.badgeId)) {
            state.communityActivity.badges.push(data.badgeId);
          }
          break;
          
        default:
          break;
      }
    },

    // Set loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // Set updating state
    setUpdating: (state, action) => {
      state.isUpdating = action.payload;
    },

    // Set error state
    setError: (state, action) => {
      state.error = action.payload;
    },

    // Set session expiry
    setSessionExpiry: (state, action) => {
      state.sessionExpiry = action.payload;
    },

    // Set session validity
    setSessionValid: (state, action) => {
      state.isSessionValid = action.payload;
    },

    // Logout user
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.sessionExpiry = null;
      state.isSessionValid = false;
      
      // Clear localStorage
      localStorage.removeItem('akan-kasa-token');
      localStorage.removeItem('akan-kasa-user');
    },

    // Reset user state
    resetUserState: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.preferences = initialState.preferences;
      state.learningProgress = initialState.learningProgress;
      state.communityActivity = initialState.communityActivity;
      state.isLoading = false;
      state.isUpdating = false;
      state.error = null;
      state.sessionExpiry = null;
      state.isSessionValid = true;
    },
  },
});

// Export actions
export const {
  setAuthentication,
  setUser,
  setToken,
  setPreferences,
  updatePreference,
  setLearningProgress,
  updateLearningProgress,
  setCommunityActivity,
  updateCommunityActivity,
  setLoading,
  setUpdating,
  setError,
  setSessionExpiry,
  setSessionValid,
  logout,
  resetUserState,
} = userSlice.actions;

// Selectors for easy state access
export const selectUser = (state) => state.user;

export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserData = (state) => state.user.user;
export const selectToken = (state) => state.user.token;
export const selectUserPreferences = (state) => state.user.preferences;
export const selectLearningProgress = (state) => state.user.learningProgress;
export const selectCommunityActivity = (state) => state.user.communityActivity;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectIsUpdating = (state) => state.user.isUpdating;
export const selectUserError = (state) => state.user.error;
export const selectSessionExpiry = (state) => state.user.sessionExpiry;
export const selectIsSessionValid = (state) => state.user.isSessionValid;

// Computed selectors
export const selectUserLevel = (state) => state.user.learningProgress.level;
export const selectCompletedLessons = (state) => state.user.learningProgress.completedLessons;
export const selectVocabularyMastered = (state) => state.user.learningProgress.vocabularyMastered;
export const selectCurrentStreak = (state) => state.user.learningProgress.currentStreak;
export const selectTotalStudyTime = (state) => state.user.learningProgress.totalStudyTime;
export const selectUserContributions = (state) => state.user.communityActivity.contributions;
export const selectUserDiscussions = (state) => state.user.communityActivity.discussions;
export const selectUserEvents = (state) => state.user.communityActivity.events;
export const selectUserBadges = (state) => state.user.communityActivity.badges;

export const selectAccessibilityPreferences = (state) => state.user.preferences.accessibility;
export const selectThemePreference = (state) => state.user.preferences.theme;
export const selectLanguagePreference = (state) => state.user.preferences.language;
export const selectNotificationPreference = (state) => state.user.preferences.notifications;
export const selectEmailUpdatesPreference = (state) => state.user.preferences.emailUpdates;

// Async action creators (for future API integration)
export const loginUser = (credentials) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In production, this would be:
    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(credentials),
    // });
    // const data = await response.json();
    
    // Mock successful login
    const mockUser = {
      id: 1,
      username: 'akan_learner',
      email: credentials.email,
      firstName: 'Akan',
      lastName: 'Learner',
      avatar: null,
      createdAt: new Date().toISOString(),
    };
    
    const mockToken = 'mock-jwt-token-' + Date.now();
    
    dispatch(setAuthentication({
      isAuthenticated: true,
      user: mockUser,
      token: mockToken,
    }));
    
    // Store user data in localStorage
    localStorage.setItem('akan-kasa-user', JSON.stringify(mockUser));
    
    // Set session expiry (24 hours from now)
    const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
    dispatch(setSessionExpiry(expiry.toISOString()));
    
  } catch (error) {
    dispatch(setError(error.message || 'Login failed'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const registerUser = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In production, this would be:
    // const response = await fetch('/api/auth/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userData),
    // });
    // const data = await response.json();
    
    // Mock successful registration
    const mockUser = {
      id: 1,
      username: userData.username,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      avatar: null,
      createdAt: new Date().toISOString(),
    };
    
    const mockToken = 'mock-jwt-token-' + Date.now();
    
    dispatch(setAuthentication({
      isAuthenticated: true,
      user: mockUser,
      token: mockToken,
    }));
    
    // Store user data in localStorage
    localStorage.setItem('akan-kasa-user', JSON.stringify(mockUser));
    
    // Set session expiry (24 hours from now)
    const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
    dispatch(setSessionExpiry(expiry.toISOString()));
    
  } catch (error) {
    dispatch(setError(error.message || 'Registration failed'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    // In production, this would be:
    // await fetch('/api/auth/logout', {
    //   method: 'POST',
    //   headers: { 'Authorization': `Bearer ${getState().user.token}` },
    // });
    
    dispatch(logout());
    
  } catch (error) {
    console.error('Logout error:', error);
    // Force logout even if API call fails
    dispatch(logout());
  }
};

export const updateUserProfile = (updates) => async (dispatch, getState) => {
  dispatch(setUpdating(true));
  dispatch(setError(null));
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In production, this would be:
    // const response = await fetch('/api/user/profile', {
    //   method: 'PUT',
    //   headers: { 
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${getState().user.token}`,
    //   },
    //   body: JSON.stringify(updates),
    // });
    // const data = await response.json();
    
    // Update local state
    const currentUser = getState().user.user;
    const updatedUser = { ...currentUser, ...updates };
    
    dispatch(setUser(updatedUser));
    
    // Update localStorage
    localStorage.setItem('akan-kasa-user', JSON.stringify(updatedUser));
    
  } catch (error) {
    dispatch(setError(error.message || 'Profile update failed'));
  } finally {
    dispatch(setUpdating(false));
  }
};

export const initializeUser = () => async (dispatch) => {
  try {
    // Check for existing session
    const token = localStorage.getItem('akan-kasa-token');
    const userData = localStorage.getItem('akan-kasa-user');
    
    if (token && userData) {
      const user = JSON.parse(userData);
      
      // Check if session is still valid
      const now = new Date();
      const expiry = new Date(getState().user.sessionExpiry);
      
      if (now < expiry) {
        dispatch(setAuthentication({
          isAuthenticated: true,
          user,
          token,
        }));
        dispatch(setSessionValid(true));
      } else {
        // Session expired, clear data
        dispatch(logout());
      }
    }
    
    // Load user preferences
    const savedPreferences = localStorage.getItem('akan-kasa-preferences');
    if (savedPreferences) {
      const preferences = JSON.parse(savedPreferences);
      dispatch(setPreferences(preferences));
    }
    
  } catch (error) {
    console.error('Failed to initialize user:', error);
    // Clear invalid data
    dispatch(logout());
  }
};