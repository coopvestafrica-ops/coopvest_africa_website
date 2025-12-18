import React from 'react';
import { useFeature } from '../hooks/useFeatureFlag';

interface FeatureFlagWrapperProps {
  featureName: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loading?: React.ReactNode;
}

/**
 * Component that conditionally renders based on feature flag status
 */
export const FeatureFlagWrapper: React.FC<FeatureFlagWrapperProps> = ({
  featureName,
  children,
  fallback,
  loading: loadingComponent,
}) => {
  const { enabled, loading } = useFeature(featureName);

  if (loading) {
    return <>{loadingComponent || null}</>;
  }

  return <>{enabled ? children : fallback || null}</>;
};

interface ConditionalRenderProps {
  condition: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Simple conditional render component
 */
export const ConditionalRender: React.FC<ConditionalRenderProps> = ({
  condition,
  children,
  fallback,
}) => {
  return <>{condition ? children : fallback || null}</>;
};

/**
 * Example usage:
 *
 * <FeatureFlagWrapper featureName="new_payment_system">
 *   <NewPaymentComponent />
 * </FeatureFlagWrapper>
 *
 * <FeatureFlagWrapper
 *   featureName="new_payment_system"
 *   fallback={<OldPaymentComponent />}
 * >
 *   <NewPaymentComponent />
 * </FeatureFlagWrapper>
 *
 * <FeatureFlagWrapper
 *   featureName="new_payment_system"
 *   loading={<Skeleton />}
 * >
 *   <NewPaymentComponent />
 * </FeatureFlagWrapper>
 */
