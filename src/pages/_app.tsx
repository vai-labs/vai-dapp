/**
 * Main application component that wraps all pages with providers and global configuration
 */
import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Web3Provider } from '@/context/Web3Context';
import { ToastProvider } from '@/context/ToastContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <ThemeProvider>
        <Web3Provider>
          <ToastProvider>
            <Component {...pageProps} />
          </ToastProvider>
        </Web3Provider>
      </ThemeProvider>
    </div>
  );
}

export default MyApp;