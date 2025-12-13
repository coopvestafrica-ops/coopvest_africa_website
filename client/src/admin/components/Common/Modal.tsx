/**
 * Coopvest Africa Admin Dashboard - Modal Component
 * Accessible modal/dialog component with animations
 */

import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  size?: 'sm' | 'base' | 'lg' | 'xl' | 'full';
  closeButton?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const sizeStyles: Record<string, string> = {
  sm: 'max-w-sm',
  base: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
  full: 'max-w-4xl',
};

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      subtitle,
      size = 'base',
      closeButton = true,
      children,
      footer,
      className,
    },
    ref
  ) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Handle escape key
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }, [isOpen, onClose]);

    // Handle click outside
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    if (!isOpen) return null;

    return (
      <>
        {/* Backdrop */}
        <div
          className={clsx(
            'fixed inset-0 bg-black/50 z-40 transition-opacity duration-200',
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
          onClick={handleBackdropClick}
        />

        {/* Modal */}
        <div
          ref={ref || modalRef}
          className={clsx(
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
            'bg-white dark:bg-slate-800 rounded-lg shadow-xl',
            'w-full mx-4',
            sizeStyles[size],
            'transition-all duration-200',
            isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none',
            className
          )}
        >
          {/* Header */}
          {(title || closeButton) && (
            <div className="flex items-start justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <div>
                {title && (
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {subtitle}
                  </p>
                )}
              </div>
              {closeButton && (
                <button
                  onClick={onClose}
                  className={clsx(
                    'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300',
                    'transition-colors duration-200 p-1'
                  )}
                  aria-label="Close modal"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex items-center justify-end gap-3">
              {footer}
            </div>
          )}
        </div>
      </>
    );
  }
);

Modal.displayName = 'Modal';

// Confirmation Modal Component
interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'danger' | 'warning';
  isLoading?: boolean;
}

export const ConfirmModal = React.forwardRef<HTMLDivElement, ConfirmModalProps>(
  (
    {
      isOpen,
      onClose,
      onConfirm,
      title,
      message,
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      variant = 'default',
      isLoading = false,
    },
    ref
  ) => {
    const handleConfirm = async () => {
      try {
        await onConfirm();
        onClose();
      } catch (error) {
        console.error('Confirmation error:', error);
      }
    };

    const confirmButtonVariant = variant === 'danger' ? 'danger' : variant === 'warning' ? 'warning' : 'primary';

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        size="sm"
        footer={
          <>
            <button
              onClick={onClose}
              disabled={isLoading}
              className={clsx(
                'px-4 py-2 text-sm font-medium rounded-lg',
                'bg-slate-200 text-slate-900 hover:bg-slate-300',
                'dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600',
                'transition-colors duration-200 disabled:opacity-50'
              )}
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className={clsx(
                'px-4 py-2 text-sm font-medium rounded-lg text-white',
                confirmButtonVariant === 'danger' && 'bg-red-600 hover:bg-red-700',
                confirmButtonVariant === 'warning' && 'bg-amber-600 hover:bg-amber-700',
                confirmButtonVariant === 'primary' && 'bg-green-600 hover:bg-green-700',
                'transition-colors duration-200 disabled:opacity-50'
              )}
            >
              {isLoading ? 'Processing...' : confirmText}
            </button>
          </>
        }
      >
        <p className="text-slate-600 dark:text-slate-400">{message}</p>
      </Modal>
    );
  }
);

ConfirmModal.displayName = 'ConfirmModal';

export default Modal;
