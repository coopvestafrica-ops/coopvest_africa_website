import axios, { AxiosInstance } from 'axios';

interface FeatureFlag {
  name: string;
  enabled: boolean;
  config: Record<string, any>;
}

interface CacheEntry {
  data: any;
  timestamp: number;
}

/**
 * Feature Flag Service for managing feature flags from admin dashboard
 */
export class FeatureFlagService {
  private api: AxiosInstance;
  private cache: Map<string, CacheEntry> = new Map();
  private cacheExpiration = 3600000; // 1 hour in milliseconds
  private refreshInterval: NodeJS.Timeout | null = null;

  constructor(baseURL: string, token?: string) {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
  }

  /**
   * Check if a feature is enabled
   */
  async isFeatureEnabled(featureName: string): Promise<boolean> {
    try {
      const cached = this.getFromCache(`feature:${featureName}`);
      if (cached) {
        return cached.enabled;
      }

      const response = await this.api.get<FeatureFlag>(
        `/api/features/${featureName}/check`
      );

      this.setCache(`feature:${featureName}`, response.data);
      return response.data.enabled;
    } catch (error) {
      console.error(`Error checking feature flag: ${featureName}`, error);
      return false;
    }
  }

  /**
   * Get feature configuration
   */
  async getFeatureConfig(
    featureName: string
  ): Promise<Record<string, any>> {
    try {
      const cached = this.getFromCache(`config:${featureName}`);
      if (cached) {
        return cached;
      }

      const response = await this.api.get<{ config: Record<string, any> }>(
        `/api/features/${featureName}/config`
      );

      this.setCache(`config:${featureName}`, response.data.config);
      return response.data.config;
    } catch (error) {
      console.error(`Error fetching feature config: ${featureName}`, error);
      return {};
    }
  }

  /**
   * Get all enabled features
   */
  async getEnabledFeatures(): Promise<string[]> {
    try {
      const cached = this.getFromCache('enabled_features');
      if (cached) {
        return cached;
      }

      const response = await this.api.get<{ features: FeatureFlag[] }>(
        '/api/features/enabled'
      );

      const features = response.data.features.map((f) => f.name);
      this.setCache('enabled_features', features);
      return features;
    } catch (error) {
      console.error('Error fetching enabled features', error);
      return [];
    }
  }

  /**
   * Get feature with full details
   */
  async getFeature(featureName: string): Promise<FeatureFlag | null> {
    try {
      const cached = this.getFromCache(`full_feature:${featureName}`);
      if (cached) {
        return cached;
      }

      const response = await this.api.get<FeatureFlag>(
        `/api/features/${featureName}`
      );

      this.setCache(`full_feature:${featureName}`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching feature: ${featureName}`, error);
      return null;
    }
  }

  /**
   * Clear cache
   */
  clearCache(key?: string): void {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  /**
   * Get from cache
   */
  private getFromCache(key: string): any {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const age = Date.now() - cached.timestamp;
    if (age > this.cacheExpiration) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  /**
   * Set cache
   */
  private setCache(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * Update auth token
   */
  setAuthToken(token: string): void {
    this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Update base URL
   */
  setBaseURL(baseURL: string): void {
    this.api.defaults.baseURL = baseURL;
  }

  /**
   * Start auto-refresh of features
   */
  startAutoRefresh(intervalMs: number = 300000): void {
    // Refresh every 5 minutes by default
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }

    this.refreshInterval = setInterval(() => {
      this.refreshFeatures();
    }, intervalMs);
  }

  /**
   * Stop auto-refresh
   */
  stopAutoRefresh(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }

  /**
   * Refresh all features
   */
  async refreshFeatures(): Promise<void> {
    this.clearCache();
    await this.getEnabledFeatures();
  }

  /**
   * Destroy service
   */
  destroy(): void {
    this.stopAutoRefresh();
    this.clearCache();
  }
}
