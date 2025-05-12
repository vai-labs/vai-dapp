/**
 * Homepage component
 * Displays main features of the VAI ecosystem with CTAs for connecting wallet and joining Bootstrap Bay
 */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Image } from '@/components/ui';
import Layout from '@/components/Layout';
import { useWeb3 } from '@/context/Web3Context';

export default function Home() {
  const { isConnected, connect } = useWeb3();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      await connect();
    } catch (error) {
      console.error('Connection error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout fixedNav>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="absolute inset-0 opacity-20 bg-pattern"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                <span className="text-blue-300">Value AI</span> Ecosystem
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Join the decentralized ecosystem for AI curation, governance and skills certification
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {!isConnected ? (
                  <button
                    onClick={handleConnect}
                    disabled={isLoading}
                    className="bg-white text-blue-800 hover:bg-blue-100 px-6 py-3 rounded-lg font-medium text-lg shadow-lg transition-all duration-200 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <span className="animate-pulse">Connecting...</span>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Connect Wallet
                      </>
                    )}
                  </button>
                ) : (
                  <Link
                    href="/bootstrap"
                    className="bg-white text-blue-800 hover:bg-blue-100 px-6 py-3 rounded-lg font-medium text-lg shadow-lg transition-all duration-200 flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707L15.414 4a1 1 0 111.414 1.414l-1 1a1 1 0 01-1.414 0l-.707-.707-1.414 1.414a1 1 0 11-1.414-1.414l1-1a1 1 0 010-1.414l.707-.707A1 1 0 0112 2zm2 8a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Join Bootstrap Bay
                  </Link>
                )}
                <Link
                  href="/fields"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-800 px-6 py-3 rounded-lg font-medium text-lg transition-all duration-200 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z" />
                  </svg>
                  Explore Fields
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="animate-float">
                  <Image
                    src="/images/hero-image.svg"
                    alt="VAI Ecosystem"
                    width={500}
                    height={500}
                    className="rounded-lg shadow-2xl"
                    fetchpriority="high"
                  />
                </div>
                <div className="absolute -right-10 -bottom-10 bg-blue-500 p-4 rounded-lg shadow-lg animate-pulse-slow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-white"
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="text-white fill-current w-full h-20"
          >
            <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Core Features of the VAI Ecosystem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600 dark:text-blue-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-300">AI Curation Fields</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Specialized domains where stakeholders curate and validate AI-generated content through 
                collective expertise.
              </p>
              <Link
                href="/fields"
                className="text-blue-600 dark:text-blue-300 font-medium flex items-center hover:underline"
              >
                Explore Fields
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-purple-600 dark:text-purple-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-purple-600 dark:text-purple-300">Data Guardian Patrol</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Community-driven system for reviewing AI-generated content, identifying issues, and improving
                data quality.
              </p>
              <Link
                href="/tasks"
                className="text-purple-600 dark:text-purple-300 font-medium flex items-center hover:underline"
              >
                View Tasks
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600 dark:text-green-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-green-600 dark:text-green-300">NFT Skill Certification</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Blockchain-verified certifications for AI-related skills, validated by community stakeholders
                and experts.
              </p>
              <Link
                href="/dashboard"
                className="text-green-600 dark:text-green-300 font-medium flex items-center hover:underline"
              >
                Your Certifications
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-yellow-600 dark:text-yellow-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-yellow-600 dark:text-yellow-300">Community Builders</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Earn VAI tokens and reputation through participation in governance, curation, and referring new
                members.
              </p>
              <Link
                href="/leaderboard"
                className="text-yellow-600 dark:text-yellow-300 font-medium flex items-center hover:underline"
              >
                View Leaderboard
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section className="py-16 bg-blue-50 dark:bg-gray-700">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            VAI Token Economics
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-300">Token Distribution</h3>
              <div className="mb-4 h-64 flex items-center justify-center">
                <div className="relative w-full max-w-xs h-64">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#ddd" strokeWidth="20" />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="20"
                        strokeDasharray="251.2"
                        strokeDashoffset="188.4"
                        transform="rotate(-90 50 50)"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="20"
                        strokeDasharray="251.2"
                        strokeDashoffset="125.6"
                        transform="rotate(-90 50 50)"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="20"
                        strokeDasharray="251.2"
                        strokeDashoffset="62.8"
                        transform="rotate(-90 50 50)"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-800 dark:text-white">100M</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
                  <span className="text-sm text-gray-600 dark:text-gray-300 flex-1">Ecosystem Growth (25%)</span>
                  <span className="text-sm font-bold text-gray-800 dark:text-white">25M</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-sm text-gray-600 dark:text-gray-300 flex-1">Community Rewards (25%)</span>
                  <span className="text-sm font-bold text-gray-800 dark:text-white">25M</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></span>
                  <span className="text-sm text-gray-600 dark:text-gray-300 flex-1">Bootstrap Bay (25%)</span>
                  <span className="text-sm font-bold text-gray-800 dark:text-white">25M</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-gray-300 rounded-full mr-2"></span>
                  <span className="text-sm text-gray-600 dark:text-gray-300 flex-1">Development & Operations (25%)</span>
                  <span className="text-sm font-bold text-gray-800 dark:text-white">25M</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-300">Token Utility</h3>
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600 dark:text-blue-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Staking in Fields</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Stake VAI tokens in specialized knowledge domains to participate in governance and earn rewards.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600 dark:text-green-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Governance Voting</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Vote on proposals to improve the ecosystem, with voting power proportional to field stake.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-600 dark:text-purple-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Rewards for Participation</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Earn VAI tokens for participating in curation, governance, and community building activities.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-600 dark:text-yellow-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Referral Bonuses</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Earn 10% referral bonuses when inviting new participants to the VAI ecosystem.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-300">Bootstrap Bay</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                The Bootstrap Bay is a community-driven funding mechanism for early supporters of the VAI ecosystem.
                Contribute and secure your share of the VAI token allocation.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Progress</span>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-300">35%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Contributors</p>
                  <p className="text-xl font-bold text-gray-800 dark:text-white">3,218</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Time Remaining</p>
                  <p className="text-xl font-bold text-gray-800 dark:text-white">14 days</p>
                </div>
              </div>
              <Link
                href="/bootstrap"
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium w-full block text-center transition-colors duration-200"
              >
                Learn More & Participate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the VAI Ecosystem?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Connect your wallet, participate in Bootstrap Bay, and become a part of the decentralized AI curation
            revolution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {!isConnected ? (
              <button
                onClick={handleConnect}
                disabled={isLoading}
                className="bg-white text-blue-800 hover:bg-blue-100 px-8 py-3 rounded-lg font-medium text-lg shadow-lg transition-all duration-200"
              >
                {isLoading ? 'Connecting...' : 'Connect Wallet'}
              </button>
            ) : (
              <Link
                href="/dashboard"
                className="bg-white text-blue-800 hover:bg-blue-100 px-8 py-3 rounded-lg font-medium text-lg shadow-lg transition-all duration-200"
              >
                Open Dashboard
              </Link>
            )}
            <Link
              href="/leaderboard"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-800 px-8 py-3 rounded-lg font-medium text-lg transition-colors duration-200"
            >
              View Leaderboard
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}