import React, { useEffect, useState } from 'react';
import { ToastProps, ToastType } from '@/types';

/**
 * Toast component for displaying notifications
 */
const Toast: React.FC<ToastProps> = ({
  message,
  type = ToastType.INFO,
  onClose,
  visible = false
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  
  // Animation states
  const [entering, setEntering] = useState(false);
  const [exiting, setExiting] = useState(false);
  
  useEffect(() => {
    if (visible && !isVisible) {
      setIsVisible(true);
      setEntering(true);
      setTimeout(() => setEntering(false), 300);
    } else if (!visible && isVisible) {
      setExiting(true);
      setTimeout(() => {
        setExiting(false);
        setIsVisible(false);
      }, 300);
    }
  }, [visible, isVisible]);

  // Background and text colors for different toast types
  const getToastColors = () => {
    switch (type) {
      case ToastType.SUCCESS:
        return 'bg-green-600 text-white';
      case ToastType.ERROR:
        return 'bg-red-600 text-white';
      case ToastType.WARNING:
        return 'bg-yellow-500 text-white';
      case ToastType.INFO:
      default:
        return 'bg-blue-600 text-white';
    }
  };

  // Icon for different toast types
  const getToastIcon = () => {
    switch (type) {
      case ToastType.SUCCESS:
        return (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      case ToastType.ERROR:
        return (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        );
      case ToastType.WARNING:
        return (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      case ToastType.INFO:
      default:
        return (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  // Don't render if not visible and not animating
  if (!isVisible && !entering && !exiting) {
    return null;
  }

  // Transition classes
  const transitionClasses = entering
    ? 'opacity-0 translate-y-4 animate-fade-in-up'
    : exiting
    ? 'opacity-0 translate-y-0 animate-fade-out-down'
    : 'opacity-100 translate-y-0';

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 max-w-md transform transition-all duration-300 ${transitionClasses}`}
      role="alert"
    >
      <div
        className={`flex items-center justify-between p-4 rounded-lg shadow-lg ${getToastColors()}`}
      >
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-3">{getToastIcon()}</div>
          <div className="text-sm font-medium">{message}</div>
        </div>
        <button
          type="button"
          className="text-white hover:text-gray-200 focus:outline-none ml-4"
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;