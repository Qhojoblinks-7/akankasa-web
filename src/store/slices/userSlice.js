// User slice using Radux v0.6.4 compatible approach

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

// Action types
export const USER_ACTIONS = {
  SET_AUTHENTICATED: 'user/setAuthenticated',
  SET_USER: 'user/setUser',
  SET_PREFERENCES: 'user/setPreferences',
  SET_LEARNING_PROGRESS: 'user/setLearningProgress',
  SET_COMMUNITY_ACTIVITY: 'user/setCommunityActivity',
  SET_LOADING: 'user/setLoading',
  SET_ERROR: 'user/setError',
  UPDATE_PREFERENCE: 'user/updatePreference',
  UPDATE_LEARNING_PROGRESS: 'user/updateLearningProgress',
  UPDATE_COMMUNITY_ACTIVITY: 'user/updateCommunityActivity',
  LOGOUT: 'user/logout',
  RESET_USER: 'user/resetUser',
};

// User reducer
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };

    case USER_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case USER_ACTIONS.SET_PREFERENCES:
      return {
        ...state,
        preferences: action.payload,
      };

    case USER_ACTIONS.SET_LEARNING_PROGRESS:
      return {
        ...state,
        learningProgress: action.payload,
      };

    case USER_ACTIONS.SET_COMMUNITY_ACTIVITY:
      return {
        ...state,
        communityActivity: action.payload,
      };

    case USER_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case USER_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case USER_ACTIONS.UPDATE_PREFERENCE:
      return {
        ...state,
        preferences: {
          ...state.preferences,
          [action.payload.key]: action.payload.value,
        },
      };

    case USER_ACTIONS.UPDATE_LEARNING_PROGRESS:
      return {
        ...state,
        learningProgress: {
          ...state.learningProgress,
          [action.payload.key]: action.payload.value,
        },
      };

    case USER_ACTIONS.UPDATE_COMMUNITY_ACTIVITY:
      return {
        ...state,
        communityActivity: {
          ...state.communityActivity,
          [action.payload.key]: action.payload.value,
        },
      };

    case USER_ACTIONS.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case USER_ACTIONS.RESET_USER:
      return initialState;

    default:
      return state;
  }
};

// Action creators
export const userActions = {
  setAuthenticated: (isAuthenticated) => ({
    type: USER_ACTIONS.SET_AUTHENTICATED,
    payload: isAuthenticated,
  }),

  setUser: (user) => ({
    type: USER_ACTIONS.SET_USER,
    payload: user,
  }),

  setPreferences: (preferences) => ({
    type: USER_ACTIONS.SET_PREFERENCES,
    payload: preferences,
  }),

  setLearningProgress: (progress) => ({
    type: USER_ACTIONS.SET_LEARNING_PROGRESS,
    payload: progress,
  }),

  setCommunityActivity: (activity) => ({
    type: USER_ACTIONS.SET_COMMUNITY_ACTIVITY,
    payload: activity,
  }),

  setLoading: (loading) => ({
    type: USER_ACTIONS.SET_LOADING,
    payload: loading,
  }),

  setError: (error) => ({
    type: USER_ACTIONS.SET_ERROR,
    payload: error,
  }),

  updatePreference: (key, value) => ({
    type: USER_ACTIONS.UPDATE_PREFERENCE,
    payload: { key, value },
  }),

  updateLearningProgress: (key, value) => ({
    type: USER_ACTIONS.UPDATE_LEARNING_PROGRESS,
    payload: { key, value },
  }),

  updateCommunityActivity: (key, value) => ({
    type: USER_ACTIONS.UPDATE_COMMUNITY_ACTIVITY,
    payload: { key, value },
  }),

  logout: () => ({
    type: USER_ACTIONS.LOGOUT,
  }),

  resetUser: () => ({
    type: USER_ACTIONS.RESET_USER,
  }),
};

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

// Export the reducer as default for store configuration
export default userReducer;