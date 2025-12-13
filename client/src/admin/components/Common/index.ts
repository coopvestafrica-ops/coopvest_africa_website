/**
 * Coopvest Africa Admin Dashboard - Common Components Export
 * Central export point for all common UI components
 */

// Core Components
export { default as Button } from './Button';
export type { ButtonVariant, ButtonSize } from './Button';

export { default as Card, CardHeader, CardBody, CardFooter } from './Card';

export { default as Modal, ConfirmModal } from './Modal';

export { default as Table } from './Table';
export type { Column } from './Table';

export { default as Badge, StatusBadge, CountBadge, ProgressBadge } from './Badge';
export type { BadgeVariant, BadgeSize } from './Badge';

// Re-export all components as a namespace
export * from './Button';
export * from './Card';
export * from './Modal';
export * from './Table';
export * from './Badge';
