import { configureStore } from '@reduxjs/toolkit';
import cultureReducer from './slices/cultureSlice';
import uiReducer from './slices/uiSlice';
import languageReducer from './slices/languageSlice';
import userReducer from './slices/userSlice'; // Corrected file name

export const store = configureStore({
  reducer: {
    culture: cultureReducer,
    ui: uiReducer,
    language: languageReducer,
    user: userReducer,
  },
});

export default store;