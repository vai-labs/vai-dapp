import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

const DocsPage: React.FC = () => {
  return (
    <Layout title="Documentation | VAI Ecosystem" description="Documentation for the VAI ecosystem">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">VAI Documentation</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="card">
            <div className="card-body">
              <h2 className="text-xl font-bold mb-4">Whitepaper</h2>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Explore the Value AI (VAI) Token comprehensive whitepaper. Learn about the token economics, governance model, and ecosystem vision.
              </p>
              <Link href="/docs/whitepaper" className="btn btn-primary w-full">
                Read Whitepaper
              </Link>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body">
              <h2 className="text-xl font-bold mb-4">User Guides</h2>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Step-by-step guides on how to use the VAI DApp, join fields, create proposals, and participate in the ecosystem.
              </p>
              <Link href="/docs/user-guides" className="btn btn-primary w-full">
                View User Guides
              </Link>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body">
              <h2 className="text-xl font-bold mb-4">Development</h2>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Technical documentation, API references, and contribution guidelines for developers interested in building on the VAI ecosystem.
              </p>
              <Link href="/docs/development" className="btn btn-primary w-full">
                Development Docs
              </Link>
            </div>
          </div>
        </div>
        
        <div className="card mb-10">
          <div className="card-body">
            <h2 className="text-2xl font-bold mb-4">About VAI</h2>
            <p className="mb-4">
              Value AI (VAI) is a groundbreaking ecosystem designed to harness collective intelligence for advancing knowledge and developing AI capabilities that enhance human potential while addressing ethical challenges.
            </p>
            <p className="mb-4">
              Our ecosystem combines decentralized governance, incentive mechanisms, and collaborative frameworks to create a sustainable environment for AI research, development, and application.
            </p>
            <p>
              Through Fields, Proposals, and Tasks, community members can actively participate in shaping the future of AI while earning rewards for their contributions.
            </p>
          </div>
        </div>
        
        <div className="card">
          <div className="card-body">
            <h2 className="text-2xl font-bold mb-4">Core Components</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Fields</h3>
                <p>
                  Knowledge domains where community members can stake tokens and collaborate. Each field represents a specific area of AI research or application.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Proposals</h3>
                <p>
                  Governance mechanisms that allow stakeholders to vote on decisions related to their fields, from resource allocation to research directions.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Tasks</h3>
                <p>
                  Specific work assignments within fields that community members can complete to earn rewards and advance the ecosystem's goals.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Trust Scores</h3>
                <p>
                  A reputation system that quantifies a member's contributions, reliability, and expertise within specific fields.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Bootstrap Bay</h3>
                <p>
                  The initial funding mechanism for the VAI ecosystem, allowing early supporters to acquire tokens and qualify for Community Builder Rewards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocsPage;