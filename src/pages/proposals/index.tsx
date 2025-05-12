import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useWeb3 } from '@/context/Web3Context';
import { useToastContext } from '@/context/ToastContext';
import type { Proposal, Field, StakeInfo } from '@/types';
import { ethers } from 'ethers';

// Mock data for development
const MOCK_FIELDS: Record<string, Field> = {
  '1': {
    id: 1,
    name: 'Artificial Intelligence Ethics',
    description: 'Research and development of ethical AI guidelines and frameworks.',
    imageUrl: '/images/fields/ai-ethics.jpg',
    stakeholders: 25,
    totalStaked: '50000',
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
    ipfsHash: 'Qm...'
  },
  '2': {
    id: 2,
    name: 'Decentralized Governance',
    description: 'Exploration of governance mechanisms for decentralized communities.',
    imageUrl: '/images/fields/decentralized-governance.jpg',
    stakeholders: 18,
    totalStaked: '35000',
    createdAt: Date.now() - 45 * 24 * 60 * 60 * 1000,
    ipfsHash: 'Qm...'
  },
  '3': {
    id: 3,
    name: 'Sustainable Technology',
    description: 'Development of technologies that reduce environmental impact.',
    imageUrl: '/images/fields/sustainable-tech.jpg',
    stakeholders: 12,
    totalStaked: '28000',
    createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
    ipfsHash: 'Qm...'
  }
};

// Mock proposals data
const MOCK_PROPOSALS: Proposal[] = [
  {
    id: 1,
    title: 'Implement Bias Detection in AI Models',
    description: 'Create a standardized framework for detecting and measuring bias in AI training models.',
    fieldId: 1,
    proposer: '0x1234...5678',
    startTime: Date.now() - 5 * 24 * 60 * 60 * 1000,
    endTime: Date.now() + 10 * 24 * 60 * 60 * 1000,
    forVotes: '30000',
    againstVotes: '5000',
    executed: false,
    ipfsHash: 'Qm...'
  },
  {
    id: 2,
    title: 'Community Governance Structure Update',
    description: 'Revise the proposal voting weights to better represent stakeholder contributions.',
    fieldId: 2,
    proposer: '0x8765...4321',
    startTime: Date.now() - 15 * 24 * 60 * 60 * 1000,
    endTime: Date.now() - 2 * 24 * 60 * 60 * 1000,
    forVotes: '25000',
    againstVotes: '15000',
    executed: true,
    ipfsHash: 'Qm...'
  },
  {
    id: 3,
    title: 'Green Mining Initiative',
    description: 'Research and implement energy-efficient mining algorithms for sustainability.',
    fieldId: 3,
    proposer: '0xabcd...efgh',
    startTime: Date.now() - 3 * 24 * 60 * 60 * 1000,
    endTime: Date.now() + 15 * 24 * 60 * 60 * 1000,
    forVotes: '18000',
    againstVotes: '6000',
    executed: false,
    ipfsHash: 'Qm...'
  }
];

const ProposalsPage: React.FC = () => {
  const router = useRouter();
  const { fieldId: queryFieldId } = router.query;
  const { account, isConnected, contracts } = useWeb3();
  const { success, error } = useToastContext();
  
  const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);
  const [stakeInfo, setStakeInfo] = useState<StakeInfo>({
    fieldId: 0,
    amount: '0',
    trustScore: 0,
    isStakeholder: false
  });
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [userFields, setUserFields] = useState<Field[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    fieldId: 0
  });

  // Initialize selected field from query parameter
  useEffect(() => {
    if (queryFieldId && !isNaN(Number(queryFieldId))) {
      setSelectedFieldId(Number(queryFieldId));
    }
  }, [queryFieldId]);

  // Fetch user's staked fields when connected
  useEffect(() => {
    if (isConnected && account) {
      fetchUserFields();
    }
  }, [isConnected, account, contracts.fieldManager]);

  // Fetch stake info when field is selected
  useEffect(() => {
    if (selectedFieldId && isConnected && account) {
      fetchUserStakeInfo(selectedFieldId);
      fetchProposals(selectedFieldId);
    }
  }, [selectedFieldId, isConnected, account, contracts.fieldManager, contracts.proposalManager]);

  const fetchUserFields = async () => {
    try {
      setIsLoading(true);
      // This would be replaced with actual contract calls
      // const fieldCount = await contracts.fieldManager.getFieldCount();
      // const fieldIds = Array.from({ length: fieldCount.toNumber() }, (_, i) => i + 1);
      // const userFieldsData = await Promise.all(
      //   fieldIds.map(async (id) => {
      //     const isStakeholder = await contracts.fieldManager.isStakeholder(id, account);
      //     if (!isStakeholder) return null;
      //     
      //     const field = await contracts.fieldManager.getField(id);
      //     return {
      //       id,
      //       name: field.name,
      //       description: field.description,
      //       // ... other field properties
      //     };
      //   })
      // );
      // const filteredFields = userFieldsData.filter(field => field !== null);
      
      // Using mock data for development
      const userFieldIds = [1, 2]; // Assume user has staked in these fields
      const fields = userFieldIds.map(id => MOCK_FIELDS[id.toString()]);
      setUserFields(fields);
      
      // If no field is selected yet, select the first one
      if (!selectedFieldId && fields.length > 0) {
        setSelectedFieldId(fields[0].id);
        setNewProposal(prev => ({ ...prev, fieldId: fields[0].id }));
      }
    } catch (err) {
      console.error('Error fetching user fields:', err);
      error('Failed to load your staked fields');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserStakeInfo = async (fieldId: number) => {
    try {
      // This would be replaced with actual contract calls
      // const isStakeholder = await contracts.fieldManager.isStakeholder(fieldId, account);
      // const stake = isStakeholder 
      //   ? ethers.utils.formatEther(await contracts.fieldManager.getStake(fieldId, account))
      //   : '0';
      // const trustScore = isStakeholder
      //   ? (await contracts.fieldManager.getTrustScore(fieldId, account)).toNumber()
      //   : 0;
      
      // Using mock data for development
      setStakeInfo({
        fieldId,
        amount: '5000',
        trustScore: 85,
        isStakeholder: true
      });
    } catch (err) {
      console.error('Error fetching user stake info:', err);
    }
  };

  const fetchProposals = async (fieldId: number) => {
    try {
      setIsLoading(true);
      // This would be replaced with actual contract calls
      // const proposalCount = await contracts.proposalManager.getProposalCount(fieldId);
      // const proposalIds = Array.from({ length: proposalCount.toNumber() }, (_, i) => i + 1);
      // const proposalsData = await Promise.all(
      //   proposalIds.map(async (id) => {
      //     const proposal = await contracts.proposalManager.getProposal(fieldId, id);
      //     return {
      //       id,
      //       title: proposal.title,
      //       description: proposal.description,
      //       fieldId,
      //       proposer: proposal.proposer,
      //       startTime: proposal.startTime.toNumber() * 1000,
      //       endTime: proposal.endTime.toNumber() * 1000,
      //       forVotes: ethers.utils.formatEther(proposal.forVotes),
      //       againstVotes: ethers.utils.formatEther(proposal.againstVotes),
      //       executed: proposal.executed,
      //       ipfsHash: proposal.ipfsHash
      //     };
      //   })
      // );
      
      // Using mock data for development
      const filteredProposals = MOCK_PROPOSALS.filter(p => p.fieldId === fieldId);
      setProposals(filteredProposals);
    } catch (err) {
      console.error('Error fetching proposals:', err);
      error('Failed to load proposals');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      error('Please connect your wallet first');
      return;
    }

    if (!stakeInfo.isStakeholder) {
      error('You must be a stakeholder in this field to create proposals');
      return;
    }

    if (!newProposal.title || !newProposal.description) {
      error('Please fill in all required fields');
      return;
    }

    try {
      setIsLoading(true);
      // This would be replaced with the actual contract call
      // const ipfsHash = await uploadProposalToIPFS({
      //   title: newProposal.title,
      //   description: newProposal.description,
      //   creator: account
      // });
      // 
      // await contracts.proposalManager.createProposal(
      //   selectedFieldId,
      //   newProposal.title,
      //   ipfsHash
      // );
      
      // Mock success for now
      success(`Proposal "${newProposal.title}" created successfully!`);
      
      // Add the new proposal to the list (in a real app, we'd refetch from the contract)
      const newProposalObj: Proposal = {
        id: proposals.length + 1,
        title: newProposal.title,
        description: newProposal.description,
        fieldId: selectedFieldId!,
        proposer: account || '0x0000',
        startTime: Date.now(),
        endTime: Date.now() + 14 * 24 * 60 * 60 * 1000, // 14 days from now
        forVotes: '0',
        againstVotes: '0',
        executed: false,
        ipfsHash: 'Qm...'
      };
      
      setProposals(prev => [...prev, newProposalObj]);
      setNewProposal({ title: '', description: '', fieldId: selectedFieldId || 0 });
      setShowCreateForm(false);
    } catch (err) {
      console.error('Error creating proposal:', err);
      error('Failed to create proposal');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVote = async (proposalId: number, voteFor: boolean) => {
    if (!isConnected) {
      error('Please connect your wallet first');
      return;
    }

    try {
      setIsLoading(true);
      // This would be replaced with the actual contract call
      // await contracts.proposalManager.vote(selectedFieldId, proposalId, voteFor);
      
      // Mock success for now
      success(`Vote ${voteFor ? 'in favor of' : 'against'} proposal #${proposalId} submitted!`);
      
      // Update proposal vote counts (in a real app, we'd refetch from the contract)
      setProposals(prev => prev.map(p => {
        if (p.id === proposalId) {
          const voteAmount = '1000'; // Mock vote amount
          return {
            ...p,
            forVotes: voteFor ? (parseFloat(p.forVotes) + parseFloat(voteAmount)).toString() : p.forVotes,
            againstVotes: !voteFor ? (parseFloat(p.againstVotes) + parseFloat(voteAmount)).toString() : p.againstVotes
          };
        }
        return p;
      }));
    } catch (err) {
      console.error('Error voting on proposal:', err);
      error('Failed to submit vote');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProposal(prev => ({ ...prev, [name]: value }));
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fieldId = parseInt(e.target.value);
    setSelectedFieldId(fieldId);
    setNewProposal(prev => ({ ...prev, fieldId }));
  };

  // Format timestamp to readable date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  // Calculate proposal status
  const getProposalStatus = (proposal: Proposal) => {
    const now = Date.now();
    
    if (proposal.executed) {
      return { label: 'Executed', color: 'badge-green' };
    }
    if (now < proposal.startTime) {
      return { label: 'Pending', color: 'badge-yellow' };
    }
    if (now > proposal.endTime) {
      const forVotes = parseFloat(proposal.forVotes);
      const againstVotes = parseFloat(proposal.againstVotes);
      if (forVotes > againstVotes) {
        return { label: 'Approved', color: 'badge-green' };
      } else {
        return { label: 'Rejected', color: 'badge-red' };
      }
    }
    
    return { label: 'Active', color: 'badge-blue' };
  };

  // Calculate vote percentages
  const calculateVotePercentage = (proposal: Proposal) => {
    const forVotes = parseFloat(proposal.forVotes);
    const againstVotes = parseFloat(proposal.againstVotes);
    const totalVotes = forVotes + againstVotes;
    
    if (totalVotes === 0) return { for: 0, against: 0 };
    
    return {
      for: Math.round((forVotes / totalVotes) * 100),
      against: Math.round((againstVotes / totalVotes) * 100)
    };
  };

  return (
    <Layout title="Proposals | VAI Ecosystem" description="View and vote on proposals in the VAI ecosystem">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Proposals</h1>

        {!isConnected ? (
          <div className="card mb-8">
            <div className="card-body text-center">
              <h2 className="text-xl font-semibold mb-4">Connect Your Wallet</h2>
              <p className="mb-6">You need to connect your wallet to view and participate in proposals.</p>
            </div>
          </div>
        ) : userFields.length === 0 ? (
          <div className="card mb-8">
            <div className="card-body text-center">
              <h2 className="text-xl font-semibold mb-4">Join a Field First</h2>
              <p className="mb-6">You need to stake in a field to participate in proposals.</p>
              <Link href="/fields" className="btn btn-primary">
                Explore Fields
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="card mb-8">
              <div className="card-body">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Your Staking Info</h2>
                    {stakeInfo.isStakeholder && (
                      <div className="text-sm">
                        <p>Staked: <span className="font-medium">{parseFloat(stakeInfo.amount).toLocaleString()} VAI</span></p>
                        <p>Trust Score: <span className="font-medium">{stakeInfo.trustScore}</span></p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <label htmlFor="fieldSelect" className="label block mb-2">Select Field</label>
                    <select
                      id="fieldSelect"
                      className="input w-full md:w-64"
                      value={selectedFieldId || ''}
                      onChange={handleFieldChange}
                    >
                      <option value="">Select a field</option>
                      {userFields.map(field => (
                        <option key={field.id} value={field.id}>
                          {field.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    className="btn btn-primary"
                    onClick={() => setShowCreateForm(!showCreateForm)}
                    disabled={!selectedFieldId}
                  >
                    {showCreateForm ? 'Cancel' : 'Create Proposal'}
                  </button>
                </div>
              </div>
            </div>

            {showCreateForm && (
              <div className="card mb-8">
                <div className="card-body">
                  <h2 className="text-xl font-semibold mb-4">Create a New Proposal</h2>
                  <form onSubmit={handleCreateProposal}>
                    <div className="mb-4">
                      <label htmlFor="title" className="label">Proposal Title</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="input"
                        value={newProposal.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="description" className="label">Description</label>
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        className="input"
                        value={newProposal.description}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Creating...' : 'Create Proposal'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {selectedFieldId ? (
              isLoading && proposals.length === 0 ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  <p className="mt-4">Loading proposals...</p>
                </div>
              ) : proposals.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-lg mb-4">No proposals have been created for this field yet.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setShowCreateForm(true)}
                  >
                    Create the First Proposal
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {proposals.map(proposal => {
                    const status = getProposalStatus(proposal);
                    const votePercentage = calculateVotePercentage(proposal);
                    const isActive = Date.now() >= proposal.startTime && Date.now() <= proposal.endTime;
                    
                    return (
                      <div key={proposal.id} className="card">
                        <div className="card-body">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold">{proposal.title}</h3>
                            <div className={`badge ${status.color} ml-0 md:ml-2 mt-2 md:mt-0`}>
                              {status.label}
                            </div>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-300 mb-6">
                            {proposal.description}
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Proposer</p>
                              <p className="font-medium">{proposal.proposer}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Start Date</p>
                              <p className="font-medium">{formatDate(proposal.startTime)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">End Date</p>
                              <p className="font-medium">{formatDate(proposal.endTime)}</p>
                            </div>
                          </div>
                          
                          <div className="mb-6">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">For: {parseFloat(proposal.forVotes).toLocaleString()} VAI</span>
                              <span className="text-sm font-medium">Against: {parseFloat(proposal.againstVotes).toLocaleString()} VAI</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                              <div 
                                className="bg-green-500 h-2.5 rounded-full" 
                                style={{ width: `${votePercentage.for}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                              <span>{votePercentage.for}% For</span>
                              <span>{votePercentage.against}% Against</span>
                            </div>
                          </div>
                          
                          {isActive && stakeInfo.isStakeholder && (
                            <div className="flex space-x-2">
                              <button 
                                className="btn btn-primary flex-1"
                                onClick={() => handleVote(proposal.id, true)}
                              >
                                Vote For
                              </button>
                              <button 
                                className="btn btn-danger flex-1"
                                onClick={() => handleVote(proposal.id, false)}
                              >
                                Vote Against
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            ) : (
              <div className="text-center py-8">
                <p>Please select a field to view proposals.</p>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default ProposalsPage;