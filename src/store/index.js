import { createStore } from 'radux';
import { cultureSlice } from './slices/cultureSlice';
import { uiSlice } from './slices/uiSlice';
import { languageSlice } from './slices/languageSlice';
import { userSlice } from './slices/userSlice';

// Create the main store with all slices
export const store = createStore({
  culture: cultureSlice,
  ui: uiSlice,
  language: languageSlice,
  user: userSlice,
});

// Export store and types for easy access
export { store as default };
export * from './slices/cultureSlice';
export * from './slices/uiSlice';
export * from './slices/languageSlice';
export * from './slices/userSlice';