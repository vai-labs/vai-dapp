import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

const DevelopmentDocsPage: React.FC = () => {
  const sections = [
    {
      title: 'Smart Contracts',
      resources: [
        { name: 'VAI Token', description: 'ERC-20 implementation with additional functionality.' },
        { name: 'Field Manager', description: 'Handles field creation, staking, and stakeholder management.' },
        { name: 'Proposal Manager', description: 'Implements proposal creation, voting, and execution.' },
        { name: 'Task Manager', description: 'Manages task lifecycle from creation to completion.' },
        { name: 'Referral Manager', description: 'Handles referral tracking and reward distribution.' }
      ]
    },
    {
      title: 'API References',
      resources: [
        { name: 'REST API', description: 'HTTP endpoints for interacting with the VAI ecosystem.' },
        { name: 'GraphQL API', description: 'Flexible querying for VAI ecosystem data.' },
        { name: 'WebSocket API', description: 'Real-time updates and event subscription.' }
      ]
    },
    {
      title: 'SDKs & Libraries',
      resources: [
        { name: 'JavaScript/TypeScript SDK', description: 'Client library for browser and Node.js applications.' },
        { name: 'Python SDK', description: 'Python client for data analysis and automation.' },
        { name: 'Mobile SDKs', description: 'Libraries for iOS and Android app development.' }
      ]
    },
    {
      title: 'Integration Guides',
      resources: [
        { name: 'Wallet Integration', description: 'Connect wallets to the VAI ecosystem.' },
        { name: 'IPFS Integration', description: 'Store and retrieve metadata and content.' },
        { name: 'Oracle Integration', description: 'Connect external data sources to the ecosystem.' }
      ]
    }
  ];

  return (
    <Layout title="Development Docs | VAI Ecosystem" description="Development documentation for the VAI ecosystem">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <Link href="/docs" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Documentation
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6">Development Documentation</h1>
        <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
          Technical resources for developers looking to build on or integrate with the VAI ecosystem.
        </p>

        <div className="mb-10 card">
          <div className="card-body">
            <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
            <p className="mb-4">
              The VAI ecosystem offers multiple ways for developers to build and integrate with our platform. 
              Whether you're looking to interact directly with smart contracts, use our APIs, or leverage our SDKs, 
              we provide comprehensive documentation to help you get started.
            </p>
            <p>
              Our architecture follows best practices for decentralized applications, with a focus on security, 
              scalability, and developer experience.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="card">
              <div className="card-body">
                <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                <div className="space-y-4">
                  {section.resources.map((resource, resourceIndex) => (
                    <div key={resourceIndex} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                      <h3 className="text-lg font-semibold mb-2">{resource.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{resource.description}</p>
                      <p className="mt-2 text-blue-600 dark:text-blue-400">Documentation coming soon</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 card">
          <div className="card-body">
            <h2 className="text-2xl font-bold mb-4">Contributing</h2>
            <p className="mb-4">
              The VAI ecosystem is open to contributions from developers around the world. We follow a standard 
              GitHub workflow for contributions:
            </p>
            <ol className="list-decimal list-inside space-y-2 mb-6">
              <li>Fork the repository you want to contribute to</li>
              <li>Create a feature branch for your changes</li>
              <li>Implement your changes with appropriate tests</li>
              <li>Submit a pull request for review</li>
              <li>Address any feedback and get your changes merged</li>
            </ol>
            <p>
              For more detailed guidelines, see our Contribution Guide (coming soon).
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DevelopmentDocsPage;