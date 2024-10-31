import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../app/feature/authSlice';
// import accountsReducer from './feature/accountsSlice'; // Import accountsReducer to manage client account information dynamically, pending potential addition to the database

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // accounts: accountsReducer, // Add the accounts reducer here when the feature is enabled
  },
});

// We expose the store in the browser console for debugging, but only in non-production mode
// Use store.getState() to view the current state in the browser console
if (process.env.NODE_ENV !== 'production') {
    (window as any).store = store;
}

// Here we export types for RootState and AppDispatch for use in the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;