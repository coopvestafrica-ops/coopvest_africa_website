/**
 * Coopvest Africa Admin Dashboard - Redux Store Configuration
 * Central store setup with all slices and middleware
 */

import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './adminSlice';
import membersReducer from './slices/membersSlice';
import loansReducer from './slices/loansSlice';
import contributionsReducer from './slices/contributionsSlice';
import complianceReducer from './slices/complianceSlice';
import analyticsReducer from './slices/analyticsSlice';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    members: membersReducer,
    loans: loansReducer,
    contributions: contributionsReducer,
    compliance: complianceReducer,
    analytics: analyticsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serialization check
        ignoredActions: ['admin/setCurrentAdmin', 'admin/setMetrics'],
        // Ignore these paths in the state
        ignoredPaths: ['admin.currentAdmin', 'admin.metrics'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
