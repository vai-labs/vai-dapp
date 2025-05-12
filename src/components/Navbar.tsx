import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useWeb3 } from '@/context/Web3Context';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { formatAddress } from '@/utils/web3';
import { useTheme } from '@/components/ThemeProvider';

interface NavbarProps {
  isFixed?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isFixed = false }) => {
  const { theme } = useTheme();
  const { isConnected, account, connect, disconnect } = useWeb3();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate dynamic navbar classes
  const navbarClasses = `
    transition-all duration-300 z-50 w-full
    ${isFixed || isScrolled ? 'bg-white dark:bg-gray-800 shadow-md' : 'bg-transparent'}
    ${isFixed ? 'fixed top-0 left-0' : ''}
  `;

  const linkClasses = `
    ${isFixed || isScrolled ? 'text-gray-800 dark:text-white' : 'text-white'}
    hover:text-blue-500 dark:hover:text-blue-400
    px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
  `;

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-2">
                <span className="text-white font-bold">VAI</span>
              </div>
              <span
                className={`text-xl font-bold ${isFixed || isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}
              >
                VAI
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link href="/bootstrap-bay" className={linkClasses}>
                  Bootstrap Bay
                </Link>
                <Link href="/fields" className={linkClasses}>
                  Fields
                </Link>
                <Link href="/proposals" className={linkClasses}>
                  Proposals
                </Link>
                <Link href="/tasks" className={linkClasses}>
                  Tasks
                </Link>
                <Link href="/leaderboard" className={linkClasses}>
                  Leaderboard
                </Link>
                
                {/* Docs Dropdown */}
                <div className="relative group">
                  <button className={`${linkClasses} flex items-center`}>
                    <span>Docs</span>
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link
                      href="/docs/whitepaper"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Whitepaper
                    </Link>
                    <Link
                      href="/docs/user-guides"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      User Guides
                    </Link>
                    <Link
                      href="/docs/development"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Development
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />

            {isConnected ? (
              <div className="flex items-center">
                <Link
                  href="/dashboard"
                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-4 py-2 rounded-md mr-3 text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <button
                  className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={disconnect}
                >
                  <span>{formatAddress(account || '')}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center"
                onClick={connect}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Connect Wallet
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${isFixed || isScrolled ? 'text-gray-800 dark:text-white' : 'text-white'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className="md:hidden"
        initial="closed"
        animate={isMobileMenuOpen ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, height: 'auto' },
          closed: { opacity: 0, height: 0 },
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 shadow-lg">
          <Link
            href="/bootstrap-bay"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Bootstrap Bay
          </Link>
          <Link
            href="/fields"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Fields
          </Link>
          <Link
            href="/proposals"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Proposals
          </Link>
          <Link
            href="/tasks"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Tasks
          </Link>
          <Link
            href="/leaderboard"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Leaderboard
          </Link>
          
          {/* Docs Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
            <p className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">Documentation</p>
            <Link
              href="/docs/whitepaper"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Whitepaper
            </Link>
            <Link
              href="/docs/user-guides"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              User Guides
            </Link>
            <Link
              href="/docs/development"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Development
            </Link>
          </div>

          {isConnected ? (
            <>
              <Link
                href="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900 flex items-center justify-between"
                onClick={() => {
                  disconnect();
                  setIsMobileMenuOpen(false);
                }}
              >
                <span>{formatAddress(account || '')}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </>
          ) : (
            <button
              className="w-full flex items-center justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                connect();
                setIsMobileMenuOpen(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Connect Wallet
            </button>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
