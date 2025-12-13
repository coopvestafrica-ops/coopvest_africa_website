import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './client/index.html',
    './client/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ========================================================================
      // FONT FAMILIES - Unified Typography System
      // ========================================================================
      fontFamily: {
        primary: [
          'Inter',
          ...defaultTheme.fontFamily.sans,
        ],
        secondary: [
          'Poppins',
          ...defaultTheme.fontFamily.sans,
        ],
        mono: [
          '"JetBrains Mono"',
          ...defaultTheme.fontFamily.mono,
        ],
      },

      // ========================================================================
      // FONT SIZES - Unified Typography Scale
      // ========================================================================
      fontSize: {
        // Display Styles
        'display-lg': [
          '57px',
          {
            lineHeight: '1.2',
            letterSpacing: '-0.25px',
            fontWeight: '700',
          },
        ],
        'display-md': [
          '45px',
          {
            lineHeight: '1.2',
            letterSpacing: '0px',
            fontWeight: '700',
          },
        ],
        'display-sm': [
          '36px',
          {
            lineHeight: '1.2',
            letterSpacing: '0px',
            fontWeight: '700',
          },
        ],

        // Headline Styles
        'headline-lg': [
          '32px',
          {
            lineHeight: '1.3',
            letterSpacing: '0px',
            fontWeight: '700',
          },
        ],
        'headline-md': [
          '28px',
          {
            lineHeight: '1.3',
            letterSpacing: '0px',
            fontWeight: '700',
          },
        ],
        'headline-sm': [
          '24px',
          {
            lineHeight: '1.3',
            letterSpacing: '0px',
            fontWeight: '700',
          },
        ],

        // Title Styles
        'title-lg': [
          '22px',
          {
            lineHeight: '1.3',
            letterSpacing: '0px',
            fontWeight: '600',
          },
        ],
        'title-md': [
          '18px',
          {
            lineHeight: '1.4',
            letterSpacing: '0.15px',
            fontWeight: '600',
          },
        ],
        'title-sm': [
          '16px',
          {
            lineHeight: '1.4',
            letterSpacing: '0.1px',
            fontWeight: '600',
          },
        ],

        // Body Styles
        'body-lg': [
          '16px',
          {
            lineHeight: '1.5',
            letterSpacing: '0.5px',
            fontWeight: '400',
          },
        ],
        'body-md': [
          '14px',
          {
            lineHeight: '1.5',
            letterSpacing: '0.25px',
            fontWeight: '400',
          },
        ],
        'body-sm': [
          '12px',
          {
            lineHeight: '1.5',
            letterSpacing: '0.4px',
            fontWeight: '400',
          },
        ],

        // Label Styles
        'label-lg': [
          '14px',
          {
            lineHeight: '1.4',
            letterSpacing: '0.1px',
            fontWeight: '500',
          },
        ],
        'label-md': [
          '12px',
          {
            lineHeight: '1.4',
            letterSpacing: '0.5px',
            fontWeight: '500',
          },
        ],
        'label-sm': [
          '11px',
          {
            lineHeight: '1.4',
            letterSpacing: '0.5px',
            fontWeight: '500',
          },
        ],
      },

      // ========================================================================
      // RESPONSIVE TYPOGRAPHY UTILITIES
      // ========================================================================
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },

      // =======================================================================
      // CUSTOM ANIMATIONS
      // =======================================================================
      animation: {
        'blob': 'blob 7s infinite',
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'slide-left': 'slideLeft 0.6s ease-out',
        'slide-right': 'slideRight 0.6s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },

      keyframes: {
        blob: {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        slideUp: {
          '0%': {
            transform: 'translateY(20px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        slideDown: {
          '0%': {
            transform: 'translateY(-20px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        slideLeft: {
          '0%': {
            transform: 'translateX(20px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        slideRight: {
          '0%': {
            transform: 'translateX(-20px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-1000px 0',
          },
          '100%': {
            backgroundPosition: '1000px 0',
          },
        },
      },

      transitionDelay: {
        '0': '0ms',
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
      },
    },
  },
  plugins: [],
};

export default config;
