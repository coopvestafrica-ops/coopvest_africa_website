/**
 * Coopvest Africa Admin Dashboard - Card Component
 * Flexible card component for displaying content with various styles
 */

import React from 'react';
import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'base' | 'lg';
  hoverable?: boolean;
  clickable?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  default: `
    bg-white dark:bg-slate-800
    border border-slate-200 dark:border-slate-700
    shadow-sm
  `,
  elevated: `
    bg-white dark:bg-slate-800
    shadow-md hover:shadow-lg
    border border-slate-100 dark:border-slate-700
  `,
  outlined: `
    bg-transparent
    border-2 border-slate-300 dark:border-slate-600
  `,
  filled: `
    bg-slate-50 dark:bg-slate-700
    border border-slate-200 dark:border-slate-600
  `,
};

const paddingStyles: Record<string, string> = {
  none: 'p-0',
  sm: 'p-3',
  base: 'p-4',
  lg: 'p-6',
};

const baseStyles = `
  rounded-lg transition-all duration-200 ease-in-out
`;

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'base',
      hoverable = false,
      clickable = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const cardClasses = clsx(
      baseStyles,
      variantStyles[variant],
      paddingStyles[padding],
      hoverable && 'hover:shadow-md hover:border-slate-300 dark:hover:border-slate-500 cursor-pointer',
      clickable && 'cursor-pointer active:scale-95',
      className
    );

    return (
      <div ref={ref} className={cardClasses} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card Header Component
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, action, children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        'flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700',
        className
      )}
      {...props}
    >
      <div className="flex-1">
        {title && <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>}
        {subtitle && <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{subtitle}</p>}
        {children}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

// Card Body Component
interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx('py-4', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardBody.displayName = 'CardBody';

// Card Footer Component
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        'pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';

export default Card;
