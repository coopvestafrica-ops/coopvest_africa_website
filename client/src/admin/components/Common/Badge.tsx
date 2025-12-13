/**
 * Coopvest Africa Admin Dashboard - Badge Component
 * Status indicator and badge component with multiple variants
 */

import React from 'react';
import clsx from 'clsx';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'secondary';
export type BadgeSize = 'sm' | 'base' | 'lg';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  dot?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: `
    bg-slate-100 text-slate-800
    dark:bg-slate-700 dark:text-slate-100
  `,
  success: `
    bg-emerald-100 text-emerald-800
    dark:bg-emerald-900/30 dark:text-emerald-300
  `,
  warning: `
    bg-amber-100 text-amber-800
    dark:bg-amber-900/30 dark:text-amber-300
  `,
  danger: `
    bg-red-100 text-red-800
    dark:bg-red-900/30 dark:text-red-300
  `,
  info: `
    bg-blue-100 text-blue-800
    dark:bg-blue-900/30 dark:text-blue-300
  `,
  primary: `
    bg-green-100 text-green-800
    dark:bg-green-900/30 dark:text-green-300
  `,
  secondary: `
    bg-purple-100 text-purple-800
    dark:bg-purple-900/30 dark:text-purple-300
  `,
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-1 text-xs font-medium rounded',
  base: 'px-3 py-1.5 text-sm font-medium rounded-md',
  lg: 'px-4 py-2 text-base font-medium rounded-lg',
};

const baseStyles = `
  inline-flex items-center gap-1.5
  font-medium transition-colors duration-200
`;

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'base',
      icon,
      dot = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const badgeClasses = clsx(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    return (
      <span ref={ref} className={badgeClasses} {...props}>
        {dot && (
          <span
            className={clsx(
              'inline-block rounded-full',
              size === 'sm' && 'w-1.5 h-1.5',
              size === 'base' && 'w-2 h-2',
              size === 'lg' && 'w-2.5 h-2.5',
              variant === 'success' && 'bg-emerald-500',
              variant === 'warning' && 'bg-amber-500',
              variant === 'danger' && 'bg-red-500',
              variant === 'info' && 'bg-blue-500',
              variant === 'primary' && 'bg-green-500',
              variant === 'secondary' && 'bg-purple-500',
              variant === 'default' && 'bg-slate-500'
            )}
          />
        )}
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span>{children}</span>
      </span>
    );
  }
);

Badge.displayName = 'Badge';

// Status Badge Component - Specialized for member/loan status
interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: 'active' | 'inactive' | 'pending' | 'suspended' | 'flagged' | 'completed' | 'rejected' | 'approved';
}

export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, ...props }, ref) => {
    const statusVariantMap: Record<string, BadgeVariant> = {
      active: 'success',
      inactive: 'default',
      pending: 'warning',
      suspended: 'danger',
      flagged: 'danger',
      completed: 'success',
      rejected: 'danger',
      approved: 'success',
    };

    const statusLabelMap: Record<string, string> = {
      active: 'Active',
      inactive: 'Inactive',
      pending: 'Pending',
      suspended: 'Suspended',
      flagged: 'Flagged',
      completed: 'Completed',
      rejected: 'Rejected',
      approved: 'Approved',
    };

    return (
      <Badge
        ref={ref}
        variant={statusVariantMap[status]}
        dot
        {...props}
      >
        {statusLabelMap[status]}
      </Badge>
    );
  }
);

StatusBadge.displayName = 'StatusBadge';

// Count Badge Component - For showing counts/notifications
interface CountBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  count: number;
  max?: number;
  variant?: BadgeVariant;
}

export const CountBadge = React.forwardRef<HTMLSpanElement, CountBadgeProps>(
  ({ count, max = 99, variant = 'danger', className, ...props }, ref) => {
    const displayCount = count > max ? `${max}+` : count;

    return (
      <span
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center',
          'w-6 h-6 rounded-full text-xs font-bold text-white',
          variant === 'danger' && 'bg-red-500',
          variant === 'warning' && 'bg-amber-500',
          variant === 'success' && 'bg-emerald-500',
          variant === 'info' && 'bg-blue-500',
          variant === 'primary' && 'bg-green-500',
          variant === 'secondary' && 'bg-purple-500',
          variant === 'default' && 'bg-slate-500',
          className
        )}
        {...props}
      >
        {displayCount}
      </span>
    );
  }
);

CountBadge.displayName = 'CountBadge';

// Progress Badge Component - For showing progress
interface ProgressBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: BadgeVariant;
  showLabel?: boolean;
}

export const ProgressBadge = React.forwardRef<HTMLDivElement, ProgressBadgeProps>(
  ({ value, max = 100, variant = 'primary', showLabel = true, className, ...props }, ref) => {
    const percentage = Math.min((value / max) * 100, 100);

    const bgColorMap: Record<BadgeVariant, string> = {
      success: 'bg-emerald-500',
      warning: 'bg-amber-500',
      danger: 'bg-red-500',
      info: 'bg-blue-500',
      primary: 'bg-green-500',
      secondary: 'bg-purple-500',
      default: 'bg-slate-500',
    };

    return (
      <div
        ref={ref}
        className={clsx('flex items-center gap-2', className)}
        {...props}
      >
        <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className={clsx('h-full transition-all duration-300', bgColorMap[variant])}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showLabel && (
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400 min-w-[3rem]">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }
);

ProgressBadge.displayName = 'ProgressBadge';

export default Badge;
