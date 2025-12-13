/**
 * Coopvest Africa Admin Dashboard - Design System
 * Comprehensive design tokens and styling guidelines
 */

// ============================================================================
// COLOR PALETTE
// ============================================================================

export const colors = {
  // Primary Colors
  primary: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E', // Main primary
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#145231',
  },

  // Neutral Colors
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937', // Dark background
    900: '#111827',
  },

  // Semantic Colors
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6',
  error: '#DC2626',

  // Status Colors
  status: {
    active: '#10B981',
    inactive: '#9CA3AF',
    pending: '#F59E0B',
    suspended: '#EF4444',
    flagged: '#8B5CF6',
  },

  // Dark Mode
  dark: {
    bg: '#0F172A',
    surface: '#1E293B',
    border: '#334155',
    text: '#F1F5F9',
  },

  // Light Mode
  light: {
    bg: '#FFFFFF',
    surface: '#F9FAFB',
    border: '#E5E7EB',
    text: '#1F2937',
  },
};

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  fontFamily: {
    sans: '"Inter", "Segoe UI", "Roboto", sans-serif',
    mono: '"Fira Code", "Courier New", monospace',
  },

  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
  },

  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },

  // Predefined text styles
  styles: {
    h1: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    bodySmall: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.4,
    },
  },
};

// ============================================================================
// SPACING
// ============================================================================

export const spacing = {
  0: '0',
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  8: '2rem', // 32px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
};

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const borderRadius = {
  none: '0',
  sm: '0.25rem', // 4px
  base: '0.5rem', // 8px
  md: '0.75rem', // 12px
  lg: '1rem', // 16px
  xl: '1.5rem', // 24px
  full: '9999px',
};

// ============================================================================
// SHADOWS
// ============================================================================

export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  focus: '0 0 0 3px rgba(34, 197, 94, 0.1), 0 0 0 1px rgba(34, 197, 94, 0.5)',
};

// ============================================================================
// TRANSITIONS & ANIMATIONS
// ============================================================================

export const transitions = {
  fast: '150ms ease-in-out',
  base: '200ms ease-in-out',
  slow: '300ms ease-in-out',
  slower: '500ms ease-in-out',

  // Easing functions
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export const animations = {
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    animation: fadeIn 300ms ease-in-out;
  `,

  slideInUp: `
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    animation: slideInUp 300ms ease-out;
  `,

  slideInDown: `
    @keyframes slideInDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    animation: slideInDown 300ms ease-out;
  `,

  slideInLeft: `
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-10px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    animation: slideInLeft 300ms ease-out;
  `,

  slideInRight: `
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(10px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    animation: slideInRight 300ms ease-out;
  `,

  pulse: `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  `,

  spin: `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    animation: spin 1s linear infinite;
  `,

  bounce: `
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    animation: bounce 1s ease-in-out infinite;
  `,
};

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
};

// ============================================================================
// COMPONENT SIZES
// ============================================================================

export const sizes = {
  // Button sizes
  button: {
    xs: {
      padding: '0.375rem 0.75rem',
      fontSize: '0.75rem',
      height: '1.75rem',
    },
    sm: {
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      height: '2rem',
    },
    base: {
      padding: '0.625rem 1.25rem',
      fontSize: '1rem',
      height: '2.5rem',
    },
    lg: {
      padding: '0.75rem 1.5rem',
      fontSize: '1.125rem',
      height: '3rem',
    },
    xl: {
      padding: '1rem 2rem',
      fontSize: '1.25rem',
      height: '3.5rem',
    },
  },

  // Input sizes
  input: {
    sm: {
      padding: '0.5rem 0.75rem',
      fontSize: '0.875rem',
      height: '2rem',
    },
    base: {
      padding: '0.625rem 1rem',
      fontSize: '1rem',
      height: '2.5rem',
    },
    lg: {
      padding: '0.75rem 1.25rem',
      fontSize: '1.125rem',
      height: '3rem',
    },
  },

  // Icon sizes
  icon: {
    xs: '1rem',
    sm: '1.25rem',
    base: '1.5rem',
    lg: '2rem',
    xl: '2.5rem',
    '2xl': '3rem',
  },
};

// ============================================================================
// Z-INDEX SCALE
// ============================================================================

export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  backdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  notification: 1080,
};

// ============================================================================
// THEME CONFIGURATION
// ============================================================================

export const theme = {
  light: {
    bg: colors.light.bg,
    surface: colors.light.surface,
    border: colors.light.border,
    text: colors.light.text,
    textSecondary: colors.neutral[600],
    textTertiary: colors.neutral[500],
  },

  dark: {
    bg: colors.dark.bg,
    surface: colors.dark.surface,
    border: colors.dark.border,
    text: colors.dark.text,
    textSecondary: colors.neutral[400],
    textTertiary: colors.neutral[500],
  },
};

// ============================================================================
// EXPORT ALL DESIGN TOKENS
// ============================================================================

export const designSystem = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  animations,
  breakpoints,
  mediaQueries,
  sizes,
  zIndex,
  theme,
};

export default designSystem;
