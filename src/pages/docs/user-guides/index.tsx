import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

const UserGuidesPage: React.FC = () => {
  const guides = [
    {
      title: 'Getting Started with VAI',
      description: 'Learn how to set up your wallet, connect to the VAI ecosystem, and navigate the interface.',
      estimatedTime: '5 min'
    },
    {
      title: 'Joining Bootstrap Bay',
      description: 'A step-by-step guide to participating in the Bootstrap Bay to acquire VAI tokens.',
      estimatedTime: '10 min'
    },
    {
      title: 'Staking in Fields',
      description: 'How to join Fields, stake VAI tokens, and start building your Trust Score.',
      estimatedTime: '8 min'
    },
    {
      title: 'Creating and Voting on Proposals',
      description: 'Learn the proposal lifecycle, how to create effective proposals, and voting strategies.',
      estimatedTime: '12 min'
    },
    {
      title: 'Completing Tasks',
      description: 'How to find, accept, and complete tasks to earn VAI rewards.',
      estimatedTime: '7 min'
    },
    {
      title: 'Understanding Trust Scores',
      description: 'Learn how Trust Scores are calculated and how to improve yours.',
      estimatedTime: '6 min'
    },
    {
      title: 'Using the Referral System',
      description: 'How to refer others to the VAI ecosystem and earn referral rewards.',
      estimatedTime: '5 min'
    },
    {
      title: 'Security Best Practices',
      description: 'Protect your account and assets with these security recommendations.',
      estimatedTime: '9 min'
    }
  ];

  return (
    <Layout title="User Guides | VAI Ecosystem" description="User guides for the VAI ecosystem">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <Link href="/docs" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Documentation
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6">User Guides</h1>
        <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
          Explore our comprehensive guides to help you navigate and make the most of the VAI ecosystem.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide, index) => (
            <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
              <div className="card-body">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{guide.title}</h3>
                  <span className="badge badge-blue">{guide.estimatedTime}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {guide.description}
                </p>
                <div className="mt-auto">
                  <button className="btn btn-primary w-full" disabled>
                    Coming Soon
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 card">
          <div className="card-body">
            <h2 className="text-2xl font-bold mb-4">Need Additional Help?</h2>
            <p className="mb-6">
              If you have questions that aren't covered in our guides, reach out to the community:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-semibold mb-2">Community Forums</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Join our forums to discuss topics with other VAI ecosystem participants.
                </p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-semibold mb-2">Discord Community</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Chat with community members and get real-time support on our Discord server.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserGuidesPage;