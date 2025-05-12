/**
 * Theme Provider Component
 * Provides theming functionality for the application with light/dark mode
 */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ChildrenProps } from '@/types';

interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

// Default theme context
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {}
});

// Check for saved theme preference or system preference
const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    // Check for saved theme in local storage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check for preferred color scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  
  // Default theme
  return 'light';
};

/**
 * Theme Provider component that provides theme functionality 
 * and persists theme preference in localStorage
 */
export const ThemeProvider = ({ children }: ChildrenProps): JSX.Element => {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);
  
  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous theme class
    root.classList.remove('light', 'dark');
    
    // Add current theme class
    root.classList.add(theme);
    
    // Store theme preference
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  const value: ThemeContextType = {
    theme,
    setTheme,
    toggleTheme
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to use the theme context
 * @returns {ThemeContextType} The theme context
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}