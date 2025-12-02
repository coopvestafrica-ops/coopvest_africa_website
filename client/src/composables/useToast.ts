import { toast } from "sonner";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastOptions {
  title?: string;
  duration?: number;
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Composable to manage toast notifications using Sonner
 * Usage: const { success, error, info, warning } = useToast();
 */
export const useToast = () => {
  /**
   * Show success toast
   */
  const success = (
    message: string,
    options?: ToastOptions
  ): string | number => {
    return toast.success(message, {
      duration: options?.duration || 5000,
      description: options?.title,
      action: options?.action,
    });
  };

  /**
   * Show error toast
   */
  const error = (
    message: string,
    options?: ToastOptions
  ): string | number => {
    return toast.error(message, {
      duration: options?.duration || 8000,
      description: options?.title,
      action: options?.action,
    });
  };

  /**
   * Show info toast
   */
  const info = (
    message: string,
    options?: ToastOptions
  ): string | number => {
    return toast.info(message, {
      duration: options?.duration || 5000,
      description: options?.title,
      action: options?.action,
    });
  };

  /**
   * Show warning toast
   */
  const warning = (
    message: string,
    options?: ToastOptions
  ): string | number => {
    return toast.warning(message, {
      duration: options?.duration || 6000,
      description: options?.title,
      action: options?.action,
    });
  };

  /**
   * Show loading toast
   */
  const loading = (
    message: string,
    options?: Omit<ToastOptions, "action">
  ): string | number => {
    return toast.loading(message, {
      duration: options?.duration || 0, // Don't auto-dismiss loading toast
      description: options?.title,
    });
  };

  /**
   * Dismiss a specific toast by ID
   */
  const dismiss = (id: string | number): void => {
    toast.dismiss(id);
  };

  /**
   * Dismiss all toasts
   */
  const dismissAll = (): void => {
    toast.dismiss();
  };

  /**
   * Promise-based toast - show loading, then success/error
   */
  const promise = <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    },
    options?: ToastOptions
  ): Promise<T> => {
    toast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
      duration: options?.duration || 5000,
      description: options?.title,
    });
    return promise;
  };

  return {
    success,
    error,
    info,
    warning,
    loading,
    dismiss,
    dismissAll,
    promise,
  };
};
