import { useEffect, useState } from 'react';
import { useFeatureFlag } from '../context/FeatureFlagContext';

interface UseFeatureReturn {
  enabled: boolean;
  config: Record<string, any>;
  loading: boolean;
  error: Error | null;
}

interface UseFeaturesReturn {
  features: string[];
  loading: boolean;
  error: Error | null;
}

/**
 * Hook to check if a feature is enabled and get its configuration
 */
export const useFeature = (featureName: string): UseFeatureReturn => {
  const { isFeatureEnabled, getFeatureConfig } = useFeatureFlag();
  const [enabled, setEnabled] = useState(false);
  const [config, setConfig] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkFeature = async () => {
      try {
        setLoading(true);
        setError(null);
        const [isEnabled, featureConfig] = await Promise.all([
          isFeatureEnabled(featureName),
          getFeatureConfig(featureName),
        ]);
        setEnabled(isEnabled);
        setConfig(featureConfig);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    checkFeature();
  }, [featureName, isFeatureEnabled, getFeatureConfig]);

  return { enabled, config, loading, error };
};

/**
 * Hook to get all enabled features
 */
export const useFeatures = (): UseFeaturesReturn => {
  const { getEnabledFeatures } = useFeatureFlag();
  const [features, setFeatures] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setLoading(true);
        setError(null);
        const enabledFeatures = await getEnabledFeatures();
        setFeatures(enabledFeatures);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, [getEnabledFeatures]);

  return { features, loading, error };
};

/**
 * Hook to check multiple features at once
 */
export const useMultipleFeatures = (
  featureNames: string[]
): Record<string, boolean> & { loading: boolean; error: Error | null } => {
  const { isFeatureEnabled } = useFeatureFlag();
  const [features, setFeatures] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkFeatures = async () => {
      try {
        setLoading(true);
        setError(null);
        const results: Record<string, boolean> = {};

        for (const featureName of featureNames) {
          results[featureName] = await isFeatureEnabled(featureName);
        }

        setFeatures(results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    if (featureNames.length > 0) {
      checkFeatures();
    }
  }, [featureNames, isFeatureEnabled]);

  return { ...features, loading, error };
};

/**
 * Hook to conditionally render based on feature flag
 */
export const useFeatureGuard = (featureName: string): boolean => {
  const { enabled, loading } = useFeature(featureName);
  return !loading && enabled;
};
