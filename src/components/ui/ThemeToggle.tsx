import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

// Import at the top to avoid hoisting issues
import { useTheme } from '@/components/ThemeProvider';

/**
 * ThemeToggle Component
 * A toggle switch for changing between light and dark themes
 */
export const ThemeToggle: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      type="button"
      className={clsx(
        'w-10 h-10 rounded-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500',
        theme === 'dark' ? 'bg-gray-700 text-yellow-300' : 'bg-blue-100 text-blue-800',
        className
      )}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      {...props}
    >
      {theme === 'dark' ? (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          initial={{ rotate: -45 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          />
        </motion.svg>
      ) : (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </motion.svg>
      )}
    </button>
  );
};

export default ThemeToggle;