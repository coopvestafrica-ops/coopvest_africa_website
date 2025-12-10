/**
 * Typography Showcase Component
 * 
 * Displays all typography styles defined in the unified typography system.
 * Use this component for design review and documentation purposes.
 */

import React from 'react';
import { typography, typographyClasses } from '@/lib/typography';

export const TypographyShowcase: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-display-lg font-secondary mb-12">Typography System</h1>

        {/* Display Styles */}
        <section className="mb-16">
          <h2 className="text-headline-md font-secondary mb-8">Display Styles</h2>
          <div className="space-y-6">
            <TypographyItem
              label="Display Large (57px)"
              className="text-display-lg font-secondary"
              text="Welcome to Coopvest Africa"
            />
            <TypographyItem
              label="Display Medium (45px)"
              className="text-display-md font-secondary"
              text="Investment Platform"
            />
            <TypographyItem
              label="Display Small (36px)"
              className="text-display-sm font-secondary"
              text="Grow Your Wealth"
            />
          </div>
        </section>

        {/* Headline Styles */}
        <section className="mb-16">
          <h2 className="text-headline-md font-secondary mb-8">Headline Styles</h2>
          <div className="space-y-6">
            <TypographyItem
              label="Headline Large (32px)"
              className="text-headline-lg font-secondary"
              text="Investment Opportunities"
            />
            <TypographyItem
              label="Headline Medium (28px)"
              className="text-headline-md font-secondary"
              text="Loan Application"
            />
            <TypographyItem
              label="Headline Small (24px)"
              className="text-headline-sm font-secondary"
              text="Account Settings"
            />
          </div>
        </section>

        {/* Title Styles */}
        <section className="mb-16">
          <h2 className="text-headline-md font-secondary mb-8">Title Styles</h2>
          <div className="space-y-6">
            <TypographyItem
              label="Title Large (22px)"
              className="text-title-lg font-primary"
              text="Dialog Title"
            />
            <TypographyItem
              label="Title Medium (18px)"
              className="text-title-md font-primary"
              text="Form Section Header"
            />
            <TypographyItem
              label="Title Small (16px)"
              className="text-title-sm font-primary"
              text="Card Title"
            />
          </div>
        </section>

        {/* Body Styles */}
        <section className="mb-16">
          <h2 className="text-headline-md font-secondary mb-8">Body Styles</h2>
          <div className="space-y-6">
            <TypographyItem
              label="Body Large (16px)"
              className="text-body-lg font-primary"
              text="This is primary body text used for main content and descriptions. It has a comfortable line height for readability."
            />
            <TypographyItem
              label="Body Medium (14px)"
              className="text-body-md font-primary"
              text="This is secondary body text used for supporting content and additional information."
            />
            <TypographyItem
              label="Body Small (12px)"
              className="text-body-sm font-primary"
              text="This is tertiary text used for captions and helper text."
            />
          </div>
        </section>

        {/* Label Styles */}
        <section className="mb-16">
          <h2 className="text-headline-md font-secondary mb-8">Label Styles</h2>
          <div className="space-y-6">
            <TypographyItem
              label="Label Large (14px)"
              className="text-label-lg font-primary"
              text="BUTTON TEXT"
            />
            <TypographyItem
              label="Label Medium (12px)"
              className="text-label-md font-primary"
              text="BADGE"
            />
            <TypographyItem
              label="Label Small (11px)"
              className="text-label-sm font-primary"
              text="TAG"
            />
          </div>
        </section>

        {/* Font Families */}
        <section className="mb-16">
          <h2 className="text-headline-md font-secondary mb-8">Font Families</h2>
          <div className="space-y-6">
            <FontInfo
              name="Primary Font: Inter"
              description="Used for body text, UI elements, and general content"
              className="font-primary text-body-lg"
            />
            <FontInfo
              name="Secondary Font: Poppins"
              description="Used for headings, display text, and emphasis"
              className="font-secondary text-body-lg"
            />
            <FontInfo
              name="Monospace Font: JetBrains Mono"
              description="Used for code, technical content, and data display"
              className="font-mono text-body-lg"
            />
          </div>
        </section>

        {/* Usage Examples */}
        <section className="mb-16">
          <h2 className="text-headline-md font-secondary mb-8">Usage Examples</h2>
          <div className="space-y-6">
            <UsageExample
              title="Page Header"
              code='<h1 className="text-display-lg font-secondary">Welcome</h1>'
              preview={<h1 className="text-display-lg font-secondary">Welcome</h1>}
            />
            <UsageExample
              title="Card Title"
              code='<h2 className="text-headline-lg font-secondary">Investment</h2>'
              preview={<h2 className="text-headline-lg font-secondary">Investment</h2>}
            />
            <UsageExample
              title="Body Text"
              code='<p className="text-body-md font-primary">Description</p>'
              preview={
                <p className="text-body-md font-primary">
                  This is a description of the investment opportunity.
                </p>
              }
            />
            <UsageExample
              title="Button Text"
              code='<button className="text-label-lg font-primary">Submit</button>'
              preview={
                <button className="text-label-lg font-primary px-6 py-2 bg-primary text-white rounded">
                  SUBMIT
                </button>
              }
            />
          </div>
        </section>

        {/* Responsive Behavior */}
        <section className="mb-16">
          <h2 className="text-headline-md font-secondary mb-8">Responsive Behavior</h2>
          <div className="space-y-4 text-body-md font-primary">
            <div className="p-4 bg-card rounded-lg border border-border">
              <h3 className="text-title-md font-primary font-semibold mb-2">Mobile (&lt; 640px)</h3>
              <ul className="list-disc list-inside space-y-1 text-body-sm">
                <li>Display styles: Reduce by 1 level</li>
                <li>Headline styles: Reduce by 1 level</li>
                <li>Body/Label: Keep consistent</li>
              </ul>
            </div>
            <div className="p-4 bg-card rounded-lg border border-border">
              <h3 className="text-title-md font-primary font-semibold mb-2">Tablet (640px - 1024px)</h3>
              <ul className="list-disc list-inside space-y-1 text-body-sm">
                <li>Display styles: Reduce by 0.5 level</li>
                <li>Other styles: Keep consistent</li>
              </ul>
            </div>
            <div className="p-4 bg-card rounded-lg border border-border">
              <h3 className="text-title-md font-primary font-semibold mb-2">Desktop (&gt; 1024px)</h3>
              <ul className="list-disc list-inside space-y-1 text-body-sm">
                <li>All styles: Use full scale as defined</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section>
          <h2 className="text-headline-md font-secondary mb-8">Accessibility Guidelines</h2>
          <div className="space-y-4 text-body-md font-primary">
            <div className="p-4 bg-card rounded-lg border border-border">
              <ul className="list-disc list-inside space-y-2 text-body-sm">
                <li><strong>Minimum Font Size:</strong> Never use font sizes below 12px for body text</li>
                <li><strong>Line Height:</strong> Maintain minimum 1.4 line height for readability</li>
                <li><strong>Contrast:</strong> Ensure text color contrast ratio ≥ 4.5:1 for normal text</li>
                <li><strong>Font Weight:</strong> Use 600+ for emphasis, avoid using color alone</li>
                <li><strong>Letter Spacing:</strong> Maintain readable letter spacing, especially for headings</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

interface TypographyItemProps {
  label: string;
  className: string;
  text: string;
}

const TypographyItem: React.FC<TypographyItemProps> = ({ label, className, text }) => (
  <div>
    <p className="text-label-md font-primary text-muted-foreground mb-2">{label}</p>
    <div className="p-4 border border-border rounded-lg bg-card">
      <p className={className}>{text}</p>
    </div>
  </div>
);

interface FontInfoProps {
  name: string;
  description: string;
  className: string;
}

const FontInfo: React.FC<FontInfoProps> = ({ name, description, className }) => (
  <div>
    <p className={`${className} font-semibold`}>{name}</p>
    <p className="text-body-sm font-primary text-muted-foreground mt-1">{description}</p>
  </div>
);

interface UsageExampleProps {
  title: string;
  code: string;
  preview: React.ReactNode;
}

const UsageExample: React.FC<UsageExampleProps> = ({ title, code, preview }) => (
  <div>
    <h3 className="text-title-md font-primary font-semibold mb-3">{title}</h3>
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="p-4 bg-muted">
        <code className="text-body-sm font-mono text-foreground">{code}</code>
      </div>
      <div className="border-t border-border p-4 bg-card">
        {preview}
      </div>
    </div>
  </div>
);

export default TypographyShowcase;
