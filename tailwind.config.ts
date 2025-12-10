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
    },
  },
  plugins: [],
};

export default config;
