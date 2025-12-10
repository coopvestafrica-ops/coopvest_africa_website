/**
 * Unified Typography System for Coopvest Africa
 * 
 * This file defines all typography styles used across the React web application.
 * Styles are organized by hierarchy: Display → Headline → Title → Body → Label
 * 
 * Font Families:
 * - Primary: Inter (body text, UI elements)
 * - Secondary: Poppins (headings, display text)
 * - Mono: JetBrains Mono (code, technical content)
 */

export const typography = {
  // ============================================================================
  // FONT FAMILIES
  // ============================================================================
  fonts: {
    primary: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    secondary: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono", "Courier New", monospace',
  },

  // ============================================================================
  // DISPLAY STYLES - For hero titles and main headings
  // ============================================================================

  /**
   * Display Large: 57px, Bold, -0.25px letter spacing
   * Use for: Hero titles, main page headings
   */
  displayLarge: {
    fontSize: '57px',
    fontWeight: 700,
    lineHeight: '1.2',
    letterSpacing: '-0.25px',
    fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  } as const,

  /**
   * Display Medium: 45px, Bold, 0px letter spacing
   * Use for: Page titles, section headers
   */
  displayMedium: {
    fontSize: '45px',
    fontWeight: 700,
    lineHeight: '1.2',
    letterSpacing: '0px',
    fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  } as const,

  /**
   * Display Small: 36px, Bold, 0px letter spacing
   * Use for: Large section headers
   */
  displaySmall: {
    fontSize: '36px',
    fontWeight: 700,
    lineHeight: '1.2',
    letterSpacing: '0px',
    fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  } as const,

  // ============================================================================
  // HEADLINE STYLES - For section headers and major content divisions
  // ============================================================================

  /**
   * Headline Large: 32px, Bold, 0px letter spacing
   * Use for: Card titles, major sections
   */
  headlineLarge: {
    fontSize: '32px',
    fontWeight: 700,
    lineHeight: '1.3',
    letterSpacing: '0px',
    fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  } as const,

  /**
   * Headline Medium: 28px, Bold, 0px letter spacing
   * Use for: Subsection headers
   */
  headlineMedium: {
    fontSize: '28px',
    fontWeight: 700,
    lineHeight: '1.3',
    letterSpacing: '0px',
    fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  } as const,

  /**
   * Headline Small: 24px, Bold, 0px letter spacing
   * Use for: Component headers
   */
  headlineSmall: {
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '1.3',
    letterSpacing: '0px',
    fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  } as const,

  // ============================================================================
  // TITLE STYLES - For smaller headings and emphasis
  // ============================================================================

  /**
   * Title Large: 22px, Semi-bold, 0px letter spacing
   * Use for: Dialog titles, form labels
   */
  titleLarge: {
    fontSize: '22px',
    fontWeight: 600,
    lineHeight: '1.3',
    letterSpacing: '0px',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  } as const,

  /**
   * Title Medium: 18px, Semi-bold, 0.15px letter spacing
   * Use for: Subheadings
   */
  titleMedium: {
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '1.4',
    letterSpacing: '0.15px',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  } as const,

  /**
   * Title Small: 16px, Semi-bold, 0.1px letter spacing
   * Use for: Small titles, emphasis
   */
  titleSmall: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '1.4',
    letterSpacing: '0.1px',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  } as const,

  // ============================================================================
  // BODY STYLES - For main content and descriptions
  // ============================================================================

  /**
   * Body Large: 16px, Regular, 0.5px letter spacing
   * Use for: Primary body text
   */
  bodyLarge: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '1.5',
    letterSpacing: '0.5px',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  } as const,

  /**
   * Body Medium: 14px, Regular, 0.25px letter spacing
   * Use for: Secondary body text
   */
  bodyMedium: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '1.5',
    letterSpacing: '0.25px',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  } as const,

  /**
   * Body Small: 12px, Regular, 0.4px letter spacing
   * Use for: Tertiary text, captions
   */
  bodySmall: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '1.5',
    letterSpacing: '0.4px',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  } as const,

  // ============================================================================
  // LABEL STYLES - For buttons, badges, and small UI elements
  // ============================================================================

  /**
   * Label Large: 14px, Medium weight, 0.1px letter spacing
   * Use for: Button text, labels
   */
  labelLarge: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '1.4',
    letterSpacing: '0.1px',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  } as const,

  /**
   * Label Medium: 12px, Medium weight, 0.5px letter spacing
   * Use for: Small labels, badges
   */
  labelMedium: {
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '1.4',
    letterSpacing: '0.5px',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  } as const,

  /**
   * Label Small: 11px, Medium weight, 0.5px letter spacing
   * Use for: Tiny labels, tags
   */
  labelSmall: {
    fontSize: '11px',
    fontWeight: 500,
    lineHeight: '1.4',
    letterSpacing: '0.5px',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  } as const,
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get responsive typography based on screen size
 * Reduces display and headline sizes on smaller screens
 */
export function getResponsiveTypography(
  baseStyle: keyof typeof typography,
  screenWidth: number
): keyof typeof typography {
  if (screenWidth < 640) {
    // Mobile: Reduce display and headline sizes
    const reductions: Record<string, keyof typeof typography> = {
      displayLarge: 'displayMedium',
      displayMedium: 'displaySmall',
      headlineLarge: 'headlineMedium',
      headlineMedium: 'headlineSmall',
    };
    return reductions[baseStyle] || baseStyle;
  }
  return baseStyle;
}

/**
 * Merge typography styles with custom overrides
 */
export function mergeTypography(
  baseStyle: keyof typeof typography,
  overrides?: Partial<typeof typography.bodyLarge>
) {
  return {
    ...typography[baseStyle],
    ...overrides,
  };
}

/**
 * Create a CSS class string from typography style
 */
export function typographyToCSS(style: keyof typeof typography): string {
  const t = typography[style];
  return `
    font-size: ${t.fontSize};
    font-weight: ${t.fontWeight};
    line-height: ${t.lineHeight};
    letter-spacing: ${t.letterSpacing};
    font-family: ${t.fontFamily};
  `;
}

// ============================================================================
// TAILWIND CLASS MAPPINGS
// ============================================================================

/**
 * Tailwind class names for typography styles
 * Use these classes in your JSX for consistent styling
 */
export const typographyClasses = {
  displayLarge: 'text-display-lg font-secondary',
  displayMedium: 'text-display-md font-secondary',
  displaySmall: 'text-display-sm font-secondary',
  headlineLarge: 'text-headline-lg font-secondary',
  headlineMedium: 'text-headline-md font-secondary',
  headlineSmall: 'text-headline-sm font-secondary',
  titleLarge: 'text-title-lg font-primary',
  titleMedium: 'text-title-md font-primary',
  titleSmall: 'text-title-sm font-primary',
  bodyLarge: 'text-body-lg font-primary',
  bodyMedium: 'text-body-md font-primary',
  bodySmall: 'text-body-sm font-primary',
  labelLarge: 'text-label-lg font-primary',
  labelMedium: 'text-label-md font-primary',
  labelSmall: 'text-label-sm font-primary',
};

export default typography;
