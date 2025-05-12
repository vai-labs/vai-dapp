import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useWeb3 } from '@/context/Web3Context';
import { useToastContext } from '@/context/ToastContext';
import type { Field, StakeInfo } from '@/types';
import { ethers } from 'ethers';

// Mock data for development
const MOCK_FIELDS: Record<string, Field> = {
  '1': {
    id: 1,
    name: 'Artificial Intelligence Ethics',
    description: 'Research and development of ethical AI guidelines and frameworks to ensure responsible AI development and usage. This field explores topics like bias mitigation, transparency, privacy protection, and human-centered AI design.',
    imageUrl: '/images/fields/ai-ethics.jpg',
    stakeholders: 25,
    totalStaked: '50000',
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
    ipfsHash: 'Qm...'
  },
  '2': {
    id: 2,
    name: 'Decentralized Governance',
    description: 'Exploration of governance mechanisms for decentralized communities and organizations. This field focuses on developing and testing democratic models that can function effectively in a decentralized environment, including voting systems, proposal mechanisms, and community consensus building.',
    imageUrl: '/images/fields/decentralized-governance.jpg',
    stakeholders: 18,
    totalStaked: '35000',
    createdAt: Date.now() - 45 * 24 * 60 * 60 * 1000,
    ipfsHash: 'Qm...'
  },
  '3': {
    id: 3,
    name: 'Sustainable Technology',
    description: 'Development of technologies that reduce environmental impact while maintaining or improving quality of life. This field researches energy-efficient computing, carbon footprint reduction in blockchain, and sustainable technological infrastructure.',
    imageUrl: '/images/fields/sustainable-tech.jpg',
    stakeholders: 12,
    totalStaked: '28000',
    createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
    ipfsHash: 'Qm...'
  }
};

// Mock stakeholders
const MOCK_STAKEHOLDERS = [
  { address: '0x1234...5678', stake: '5000', trustScore: 85 },
  { address: '0x8765...4321', stake: '3500', trustScore: 72 },
  { address: '0xabcd...efgh', stake: '2800', trustScore: 65 },
  { address: '0x9876...5432', stake: '4200', trustScore: 78 },
  { address: '0xfedc...ba98', stake: '1500', trustScore: 45 },
];

const FieldDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { account, isConnected, contracts } = useWeb3();
  const { success, error } = useToastContext();
  
  const [field, setField] = useState<Field | null>(null);
  const [stakeInfo, setStakeInfo] = useState<StakeInfo>({
    fieldId: 0,
    amount: '0',
    trustScore: 0,
    isStakeholder: false
  });
  const [stakeholders, setStakeholders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stakeAmount, setStakeAmount] = useState('1000');
  const [showStakeForm, setShowStakeForm] = useState(false);

  useEffect(() => {
    if (id && !Array.isArray(id)) {
      fetchFieldDetails(id);
      fetchStakeholders(id);
      if (isConnected && account) {
        fetchUserStakeInfo(id);
      }
    }
  }, [id, isConnected, account, contracts.fieldManager]);

  const fetchFieldDetails = async (fieldId: string) => {
    try {
      setIsLoading(true);
      // This would be replaced with actual contract calls
      // const fieldData = await contracts.fieldManager.getField(fieldId);
      // const field = {
      //   id: parseInt(fieldId),
      //   name: fieldData.name,
      //   description: fieldData.description,
      //   imageUrl: `/images/fields/field-${fieldId}.jpg`,
      //   stakeholders: await contracts.fieldManager.getStakeholderCount(fieldId),
      //   totalStaked: ethers.utils.formatEther(await contracts.fieldManager.getTotalStaked(fieldId)),
      //   createdAt: fieldData.createdAt.toNumber() * 1000,
      //   ipfsHash: fieldData.ipfsHash
      // };
      
      // Using mock data for development
      setField(MOCK_FIELDS[fieldId] || null);
    } catch (err) {
      console.error('Error fetching field details:', err);
      error('Failed to load field details');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStakeholders = async (fieldId: string) => {
    try {
      // This would be replaced with actual contract calls
      // const stakeholderAddresses = await contracts.fieldManager.getStakeholders(fieldId);
      // const stakeholderDetails = await Promise.all(
      //   stakeholderAddresses.map(async (address) => {
      //     const stake = await contracts.fieldManager.getStake(fieldId, address);
      //     const trustScore = await contracts.fieldManager.getTrustScore(fieldId, address);
      //     return {
      //       address,
      //       stake: ethers.utils.formatEther(stake),
      //       trustScore: trustScore.toNumber()
      //     };
      //   })
      // );
      
      // Using mock data for development
      setStakeholders(MOCK_STAKEHOLDERS);
    } catch (err) {
      console.error('Error fetching stakeholders:', err);
    }
  };

  const fetchUserStakeInfo = async (fieldId: string) => {
    if (!account) return;
    
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
      const isStakeholder = Math.random() > 0.5;
      setStakeInfo({
        fieldId: parseInt(fieldId),
        amount: isStakeholder ? '3000' : '0',
        trustScore: isStakeholder ? 70 : 0,
        isStakeholder
      });
    } catch (err) {
      console.error('Error fetching user stake info:', err);
    }
  };

  const handleStake = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      error('Please connect your wallet first');
      return;
    }

    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      error('Please enter a valid stake amount');
      return;
    }

    try {
      setIsLoading(true);
      // This would be replaced with the actual contract call
      // const stakeAmountWei = ethers.utils.parseEther(stakeAmount);
      // await contracts.fieldManager.stakeInField(field.id, stakeAmountWei);
      
      // Mock success for now
      success(`Successfully staked ${stakeAmount} VAI in ${field?.name}`);
      
      // Update stake info (in a real app, we'd refetch from the contract)
      setStakeInfo(prev => ({
        ...prev,
        amount: (parseFloat(prev.amount) + parseFloat(stakeAmount)).toString(),
        isStakeholder: true,
        trustScore: Math.min(100, prev.trustScore + 5)
      }));
      
      setShowStakeForm(false);
    } catch (err) {
      console.error('Error staking in field:', err);
      error('Failed to stake');
    } finally {
      setIsLoading(false);
    }
  };

  // Format timestamp to readable date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  // Format stake amounts to readable format
  const formatStake = (stakeAmount: string) => {
    return parseFloat(stakeAmount).toLocaleString() + ' VAI';
  };

  if (isLoading && !field) {
    return (
      <Layout title="Loading Field | VAI Ecosystem" description="Loading field details">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4">Loading field details...</p>
        </div>
      </Layout>
    );
  }

  if (!field) {
    return (
      <Layout title="Field Not Found | VAI Ecosystem" description="Field not found">
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Field Not Found</h1>
          <p className="mb-6">The field you are looking for does not exist or has been removed.</p>
          <Link href="/fields" className="btn btn-primary">
            Return to Fields
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title={`${field.name} | VAI Ecosystem`} 
      description={field.description.substring(0, 160)}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <Link href="/fields" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Fields
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card">
              <div className="h-64 overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img 
                  src={field.imageUrl || '/images/fields/placeholder.jpg'}
                  alt={field.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/fields/placeholder.jpg';
                  }}
                />
              </div>
              <div className="card-body">
                <h1 className="text-3xl font-bold mb-4">{field.name}</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{field.description}</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Stakeholders</p>
                    <p className="text-xl font-semibold">{field.stakeholders}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Staked</p>
                    <p className="text-xl font-semibold">{formatStake(field.totalStaked)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Created</p>
                    <p className="text-xl font-semibold">{formatDate(field.createdAt)}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href={`/proposals?fieldId=${field.id}`} 
                    className="btn btn-primary"
                  >
                    View Proposals
                  </Link>
                  <Link 
                    href={`/tasks?fieldId=${field.id}`} 
                    className="btn btn-secondary"
                  >
                    View Tasks
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            {stakeInfo.isStakeholder ? (
              <div className="card mb-6">
                <div className="card-body">
                  <h3 className="text-xl font-semibold mb-4">Your Stake</h3>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Staked Amount</p>
                    <p className="text-2xl font-bold">{formatStake(stakeInfo.amount)}</p>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Trust Score</p>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4 mr-2">
                        <div 
                          className="bg-blue-500 h-4 rounded-full" 
                          style={{ width: `${stakeInfo.trustScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{stakeInfo.trustScore}</span>
                    </div>
                  </div>
                  
                  <button 
                    className="btn btn-primary w-full"
                    onClick={() => setShowStakeForm(!showStakeForm)}
                  >
                    {showStakeForm ? 'Cancel' : 'Stake More VAI'}
                  </button>
                  
                  {showStakeForm && (
                    <form onSubmit={handleStake} className="mt-4">
                      <div className="mb-4">
                        <label htmlFor="stakeAmount" className="label">Amount to Stake (VAI)</label>
                        <input
                          type="number"
                          id="stakeAmount"
                          min="100"
                          className="input"
                          value={stakeAmount}
                          onChange={(e) => setStakeAmount(e.target.value)}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Processing...' : 'Stake VAI'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ) : (
              <div className="card mb-6">
                <div className="card-body text-center">
                  <h3 className="text-xl font-semibold mb-4">Join This Field</h3>
                  <p className="mb-6">
                    Stake VAI tokens to join this field and participate in proposals and tasks.
                  </p>
                  
                  {!showStakeForm ? (
                    <button 
                      className="btn btn-primary w-full"
                      onClick={() => setShowStakeForm(true)}
                    >
                      Stake to Join
                    </button>
                  ) : (
                    <form onSubmit={handleStake}>
                      <div className="mb-4">
                        <label htmlFor="stakeAmount" className="label">Amount to Stake (VAI)</label>
                        <input
                          type="number"
                          id="stakeAmount"
                          min="100"
                          className="input"
                          value={stakeAmount}
                          onChange={(e) => setStakeAmount(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="btn btn-secondary flex-1"
                          onClick={() => setShowStakeForm(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary flex-1"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Processing...' : 'Stake VAI'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}
            
            <div className="card">
              <div className="card-body">
                <h3 className="text-xl font-semibold mb-4">Top Stakeholders</h3>
                
                {stakeholders.length > 0 ? (
                  <div className="space-y-4">
                    {stakeholders.map((stakeholder, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                            <span className="text-xs font-semibold text-indigo-800 dark:text-indigo-200">
                              {idx + 1}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{stakeholder.address}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Trust Score: {stakeholder.trustScore}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatStake(stakeholder.stake)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No stakeholders yet. Be the first to join!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FieldDetail;