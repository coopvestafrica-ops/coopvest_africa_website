import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { FeatureFlagService } from '../services/featureFlagService';

interface FeatureFlagContextType {
  isFeatureEnabled: (featureName: string) => Promise<boolean>;
  getFeatureConfig: (featureName: string) => Promise<Record<string, any>>;
  getEnabledFeatures: () => Promise<string[]>;
  getFeature: (featureName: string) => Promise<any>;
  clearCache: (key?: string) => void;
  setAuthToken: (token: string) => void;
  setBaseURL: (baseURL: string) => void;
  refreshFeatures: () => Promise<void>;
  startAutoRefresh: (intervalMs?: number) => void;
  stopAutoRefresh: () => void;
}

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(
  undefined
);

interface FeatureFlagProviderProps {
  children: React.ReactNode;
  baseURL?: string;
  autoRefresh?: boolean;
  autoRefreshInterval?: number;
}

export const FeatureFlagProvider: React.FC<FeatureFlagProviderProps> = ({
  children,
  baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000',
  autoRefresh = true,
  autoRefreshInterval = 300000, // 5 minutes
}) => {
  const [service] = useState(
    () => new FeatureFlagService(baseURL)
  );

  useEffect(() => {
    if (autoRefresh) {
      service.startAutoRefresh(autoRefreshInterval);
    }

    return () => {
      service.stopAutoRefresh();
    };
  }, [service, autoRefresh, autoRefreshInterval]);

  const value: FeatureFlagContextType = {
    isFeatureEnabled: useCallback(
      (featureName) => service.isFeatureEnabled(featureName),
      [service]
    ),
    getFeatureConfig: useCallback(
      (featureName) => service.getFeatureConfig(featureName),
      [service]
    ),
    getEnabledFeatures: useCallback(
      () => service.getEnabledFeatures(),
      [service]
    ),
    getFeature: useCallback(
      (featureName) => service.getFeature(featureName),
      [service]
    ),
    clearCache: useCallback(
      (key) => service.clearCache(key),
      [service]
    ),
    setAuthToken: useCallback(
      (token) => service.setAuthToken(token),
      [service]
    ),
    setBaseURL: useCallback(
      (baseURL) => service.setBaseURL(baseURL),
      [service]
    ),
    refreshFeatures: useCallback(
      () => service.refreshFeatures(),
      [service]
    ),
    startAutoRefresh: useCallback(
      (intervalMs) => service.startAutoRefresh(intervalMs),
      [service]
    ),
    stopAutoRefresh: useCallback(
      () => service.stopAutoRefresh(),
      [service]
    ),
  };

  return (
    <FeatureFlagContext.Provider value={value}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const useFeatureFlag = (): FeatureFlagContextType => {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error('useFeatureFlag must be used within FeatureFlagProvider');
  }
  return context;
};
