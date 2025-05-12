import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

// Mock whitepaper content from attached whitepaper 
const WHITEPAPER_CONTENT = `
# VAI: Value AI Token

## Comprehensive Whitepaper v0.9
June 2025

## Abstract

The Value AI (VAI) token ecosystem is designed to advance human knowledge through incentivized AI curation and development. This whitepaper outlines our approach to building a decentralized ecosystem that harnesses collective intelligence to curate quality AI-generated content, create effective data guardian patrol review systems, and develop NFT-based skill certification.

VAI implements a Field-based organizational structure where stakeholders can contribute to specific knowledge domains, participate in governance through proposals, and earn rewards through value creation. The ecosystem's architecture is designed to promote quality contributions, prevent manipulation, and ensure sustainable growth.

## 1. Introduction

### 1.1 The Problem

The acceleration of AI capabilities has created both unprecedented opportunities and challenges. While generative AI can produce vast amounts of content and code, distinguishing quality from mediocrity remains a human-centric task. Additionally, responsible AI development requires robust governance mechanisms and ethical considerations.

### 1.2 Our Solution

VAI creates a decentralized ecosystem where participants are incentivized to:
- Curate and validate AI-generated content
- Join specialized Fields as stakeholders
- Participate in governance through proposals
- Complete value-creating tasks
- Build reputation through Trust Scores
- Earn rewards proportional to their contributions

## 2. Ecosystem Architecture

### 2.1 Fields

Fields are specialized knowledge domains within the VAI ecosystem. Each Field represents a specific area where stakeholders can:
- Stake VAI tokens to become stakeholders
- Earn Trust Scores based on contributions
- Propose and vote on governance decisions
- Create and complete tasks
- Earn rewards from Field-specific activities

### 2.2 Proposals

Proposals enable democratic governance within Fields:
- Stakeholders can create proposals for Field direction
- Voting power is weighted by stake amount and Trust Score
- Executed proposals can allocate resources, modify parameters, or implement new features
- Proposal mechanisms prevent plutocracy through Trust Score factoring

### 2.3 Tasks

Tasks are specific work assignments within Fields:
- Can be created by stakeholders with sufficient Trust Score
- Offer VAI token rewards for completion
- Are validated by Field stakeholders
- Generate Trust Score increases for creators and completers
- Drive ecosystem development and value creation

## 3. Tokenomics

### 3.1 Token Utility

VAI tokens serve multiple functions within the ecosystem:
- Staking in Fields to become a stakeholder
- Voting on proposals
- Rewards for task completion
- Incentives for quality contributions
- Exchange medium for ecosystem services

### 3.2 Token Distribution

The initial distribution of VAI tokens is designed to ensure fair access and prevent concentration:
- 20% - Bootstrap Bay participants
- 15% - Development fund
- 15% - Ecosystem growth
- 20% - Community rewards
- 10% - Liquidity provision
- 20% - Reserve fund

### 3.3 Bootstrap Bay

The Bootstrap Bay is the initial token acquisition mechanism:
- Early supporters can contribute to receive VAI tokens
- Fixed exchange rate of 100 VAI per 1 USDT
- Limited-time window to participate
- Community Builder Rewards for active participants

## 4. Governance Model

### 4.1 Trust Scores

Trust Scores quantify a stakeholder's reputation within a Field:
- Increased through quality contributions and participation
- Factored into voting power for proposals
- Required for certain privileged actions
- Field-specific to encourage specialization
- Decays gradually if participation ceases

### 4.2 Adaptation Mechanism

The VAI ecosystem implements adaptation mechanisms to evolve with changing conditions:
- Parameter adjustment through governance
- Automatic scaling based on ecosystem metrics
- Field-specific adaptations reflecting domain needs
- Resistance to manipulation and attacks

## 5. Technical Implementation

### 5.1 Smart Contracts

The VAI ecosystem is built on smart contracts that handle:
- Token operations (transfer, staking, rewards)
- Field management (creation, stakeholder tracking)
- Proposal lifecycle (creation, voting, execution)
- Task management (creation, assignment, validation)
- Trust Score calculation and tracking

### 5.2 Interfaces

Multiple interfaces provide access to the VAI ecosystem:
- Web application for general users
- Mobile apps for on-the-go participation
- API for developers and integrations
- Smart contract interfaces for direct blockchain interaction

## 6. Roadmap

### Phase 1: Foundation (Q2 2025)
- Token contract deployment
- Bootstrap Bay launch
- Basic Field functionality
- Web application release

### Phase 2: Expansion (Q3 2025)
- Enhanced governance mechanisms
- Task system implementation
- Trust Score refinement
- Mobile application release

### Phase 3: Ecosystem Growth (Q4 2025)
- Developer tools and SDK
- Partnerships and integrations
- Advanced adaptation mechanisms
- Cross-chain functionality

## 7. Conclusion

The VAI ecosystem represents a novel approach to harnessing collective intelligence for AI advancement while ensuring ethical considerations and quality contributions. By aligning incentives with value creation and implementing robust governance mechanisms, VAI aims to create a sustainable ecosystem that benefits all participants while advancing human knowledge and AI capabilities.
`;

const WhitepaperPage: React.FC = () => {
  const [content, setContent] = useState<string[]>([]);

  useEffect(() => {
    // Process the whitepaper content for rendering
    const lines = WHITEPAPER_CONTENT.trim().split('\n');
    setContent(lines);
  }, []);

  // Simple Markdown-like rendering
  const renderLine = (line: string, index: number) => {
    if (line.startsWith('# ')) {
      return <h1 key={index} className="text-4xl font-bold mb-6">{line.replace('# ', '')}</h1>;
    } else if (line.startsWith('## ')) {
      return <h2 key={index} className="text-3xl font-bold mb-4 mt-8">{line.replace('## ', '')}</h2>;
    } else if (line.startsWith('### ')) {
      return <h3 key={index} className="text-2xl font-bold mb-3 mt-6">{line.replace('### ', '')}</h3>;
    } else if (line.startsWith('- ')) {
      return <li key={index} className="ml-6 mb-2">{line.replace('- ', '')}</li>;
    } else if (line.trim() === '') {
      return <div key={index} className="mb-4"></div>;
    } else {
      return <p key={index} className="mb-4">{line}</p>;
    }
  };

  return (
    <Layout title="Whitepaper | VAI Ecosystem" description="VAI Token Comprehensive Whitepaper">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <Link href="/docs" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Documentation
          </Link>
        </div>

        <div className="card">
          <div className="card-body prose prose-lg dark:prose-invert max-w-none">
            {content.map((line, index) => renderLine(line, index))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WhitepaperPage;