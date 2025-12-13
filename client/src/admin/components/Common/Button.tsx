/**
 * Coopvest Africa Admin Dashboard - Button Component
 * Versatile button component with multiple variants and sizes
 */

import React, { forwardRef } from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'ghost' | 'outline';
export type ButtonSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-green-600 text-white hover:bg-green-700 active:bg-green-800
    focus:ring-2 focus:ring-green-500 focus:ring-offset-2
    dark:focus:ring-offset-slate-900
  `,
  secondary: `
    bg-slate-200 text-slate-900 hover:bg-slate-300 active:bg-slate-400
    focus:ring-2 focus:ring-slate-500 focus:ring-offset-2
    dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600
    dark:focus:ring-offset-slate-900
  `,
  danger: `
    bg-red-600 text-white hover:bg-red-700 active:bg-red-800
    focus:ring-2 focus:ring-red-500 focus:ring-offset-2
    dark:focus:ring-offset-slate-900
  `,
  success: `
    bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800
    focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
    dark:focus:ring-offset-slate-900
  `,
  warning: `
    bg-amber-600 text-white hover:bg-amber-700 active:bg-amber-800
    focus:ring-2 focus:ring-amber-500 focus:ring-offset-2
    dark:focus:ring-offset-slate-900
  `,
  ghost: `
    bg-transparent text-slate-700 hover:bg-slate-100 active:bg-slate-200
    focus:ring-2 focus:ring-slate-500 focus:ring-offset-2
    dark:text-slate-300 dark:hover:bg-slate-800 dark:active:bg-slate-700
    dark:focus:ring-offset-slate-900
  `,
  outline: `
    border-2 border-slate-300 text-slate-700 hover:bg-slate-50 active:bg-slate-100
    focus:ring-2 focus:ring-slate-500 focus:ring-offset-2
    dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800
    dark:active:bg-slate-700 dark:focus:ring-offset-slate-900
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'px-3 py-1.5 text-xs font-medium rounded-md',
  sm: 'px-4 py-2 text-sm font-medium rounded-md',
  base: 'px-5 py-2.5 text-base font-medium rounded-lg',
  lg: 'px-6 py-3 text-lg font-medium rounded-lg',
  xl: 'px-8 py-4 text-xl font-medium rounded-lg',
};

const baseStyles = `
  inline-flex items-center justify-center gap-2
  font-medium transition-all duration-200 ease-in-out
  disabled:opacity-50 disabled:cursor-not-allowed
  focus:outline-none
  whitespace-nowrap
`;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'base',
      isLoading = false,
      isDisabled = false,
      fullWidth = false,
      icon,
      iconPosition = 'left',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isButtonDisabled = isDisabled || isLoading;

    const buttonClasses = clsx(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && 'w-full',
      className
    );

    const iconElement = isLoading ? (
      <svg
        className="animate-spin h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    ) : (
      icon
    );

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={isButtonDisabled}
        {...props}
      >
        {iconElement && iconPosition === 'left' && iconElement}
        <span>{children}</span>
        {iconElement && iconPosition === 'right' && iconElement}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
