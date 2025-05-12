import { useState, useEffect, useCallback } from 'react';
import { ToastType } from '@/types';

interface ToastOptions {
  type?: ToastType;
  duration?: number;
}

interface ToastState {
  message: string;
  type: ToastType;
  duration: number;
  show: boolean;
}

interface UseToastReturn {
  toast: (message: string, type?: ToastType, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  toastState: ToastState;
  hideToast: () => void;
}

const DEFAULT_DURATION = 3000; // 3 seconds
const DEFAULT_TYPE = ToastType.INFO;

/**
 * Custom hook for displaying toast notifications
 * @returns {UseToastReturn} Toast functions and state
 */
const useToast = (): UseToastReturn => {
  const [toastState, setToastState] = useState<ToastState>({
    message: '',
    type: DEFAULT_TYPE,
    duration: DEFAULT_DURATION,
    show: false
  });

  // Hide toast
  const hideToast = useCallback(() => {
    setToastState(prev => ({ ...prev, show: false }));
  }, []);

  // Auto-hide toast after duration
  useEffect(() => {
    if (toastState.show && toastState.duration > 0) {
      const timer = setTimeout(hideToast, toastState.duration);
      return () => clearTimeout(timer);
    }
  }, [toastState.show, toastState.duration, hideToast]);

  // Show toast
  const toast = useCallback(
    (message: string, 
      type: ToastType = ToastType.INFO, 
      duration: number = DEFAULT_DURATION) => {
      setToastState({
        message,
        type,
        duration,
        show: true
      });
    },
    []
  );

  // Helper methods for different toast types
  const success = useCallback(
    (message: string, duration?: number) => {
      toast(message, ToastType.SUCCESS, duration);
    },
    [toast]
  );

  const error = useCallback(
    (message: string, duration?: number) => {
      toast(message, ToastType.ERROR, duration);
    },
    [toast]
  );

  const warning = useCallback(
    (message: string, duration?: number) => {
      toast(message, ToastType.WARNING, duration);
    },
    [toast]
  );

  const info = useCallback(
    (message: string, duration?: number) => {
      toast(message, ToastType.INFO, duration);
    },
    [toast]
  );

  return {
    toast,
    success,
    error,
    warning,
    info,
    toastState,
    hideToast
  };
};

export default useToast;