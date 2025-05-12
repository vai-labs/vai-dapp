import React, { createContext, useContext } from 'react';
import Toast from '@/components/ui/Toast';
import useToast from '@/hooks/useToast';
import { ChildrenProps, ToastType } from '@/types';

interface ToastContextType {
  toast: (message: string, type?: ToastType, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * Provider component for toast notifications
 */
export const ToastProvider = ({ children }: ChildrenProps): JSX.Element => {
  const {
    toast,
    success,
    error,
    warning,
    info,
    toastState,
    hideToast
  } = useToast();

  const contextValue: ToastContextType = {
    toast,
    success,
    error,
    warning,
    info
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Toast
        message={toastState.message}
        type={toastState.type}
        visible={toastState.show}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
};

/**
 * Hook to use toast notifications
 * @returns {ToastContextType} Toast functions
 */
export const useToastContext = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};