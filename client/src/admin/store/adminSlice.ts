/**
 * Coopvest Africa Admin Dashboard - Redux Admin Slice
 * Centralized state management for admin dashboard
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AdminUser,
  Permission,
  DashboardMetrics,
  AuditLog,
  SecurityAlert,
  AdminDashboardState,
} from '../types';

const initialState: AdminDashboardState = {
  currentAdmin: null,
  isAuthenticated: false,
  permissions: [],
  metrics: null,
  recentActivity: [],
  systemAlerts: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    // Authentication actions
    setCurrentAdmin: (state, action: PayloadAction<AdminUser>) => {
      state.currentAdmin = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },

    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
      if (!action.payload) {
        state.currentAdmin = null;
        state.permissions = [];
      }
    },

    // Permissions actions
    setPermissions: (state, action: PayloadAction<Permission[]>) => {
      state.permissions = action.payload;
    },

    addPermission: (state, action: PayloadAction<Permission>) => {
      if (!state.permissions.find((p) => p.id === action.payload.id)) {
        state.permissions.push(action.payload);
      }
    },

    removePermission: (state, action: PayloadAction<string>) => {
      state.permissions = state.permissions.filter((p) => p.id !== action.payload);
    },

    // Metrics actions
    setMetrics: (state, action: PayloadAction<DashboardMetrics>) => {
      state.metrics = action.payload;
    },

    updateMetrics: (state, action: PayloadAction<Partial<DashboardMetrics>>) => {
      if (state.metrics) {
        state.metrics = { ...state.metrics, ...action.payload };
      }
    },

    // Activity actions
    setRecentActivity: (state, action: PayloadAction<AuditLog[]>) => {
      state.recentActivity = action.payload;
    },

    addActivityLog: (state, action: PayloadAction<AuditLog>) => {
      state.recentActivity.unshift(action.payload);
      // Keep only last 50 activities in memory
      if (state.recentActivity.length > 50) {
        state.recentActivity.pop();
      }
    },

    // System alerts actions
    setSystemAlerts: (state, action: PayloadAction<SecurityAlert[]>) => {
      state.systemAlerts = action.payload;
    },

    addSystemAlert: (state, action: PayloadAction<SecurityAlert>) => {
      state.systemAlerts.unshift(action.payload);
      // Keep only last 20 alerts in memory
      if (state.systemAlerts.length > 20) {
        state.systemAlerts.pop();
      }
    },

    acknowledgeAlert: (state, action: PayloadAction<string>) => {
      const alert = state.systemAlerts.find((a) => a.id === action.payload);
      if (alert) {
        alert.acknowledged = true;
        alert.acknowledgedAt = new Date();
      }
    },

    removeAlert: (state, action: PayloadAction<string>) => {
      state.systemAlerts = state.systemAlerts.filter((a) => a.id !== action.payload);
    },

    // Loading and error actions
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },

    clearError: (state) => {
      state.error = null;
    },

    // Logout action
    logout: (state) => {
      state.currentAdmin = null;
      state.isAuthenticated = false;
      state.permissions = [];
      state.metrics = null;
      state.recentActivity = [];
      state.systemAlerts = [];
      state.error = null;
    },

    // Reset state
    resetState: () => initialState,
  },
});

export const {
  setCurrentAdmin,
  setAuthenticated,
  setPermissions,
  addPermission,
  removePermission,
  setMetrics,
  updateMetrics,
  setRecentActivity,
  addActivityLog,
  setSystemAlerts,
  addSystemAlert,
  acknowledgeAlert,
  removeAlert,
  setLoading,
  setError,
  clearError,
  logout,
  resetState,
} = adminSlice.actions;

export default adminSlice.reducer;
