import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useWeb3 } from '@/context/Web3Context';
import { useToastContext } from '@/context/ToastContext';
import type { BootstrapInfo } from '@/types';

// Mock data for development - will be replaced with contract calls
const MOCK_BOOTSTRAP_PARTICIPANTS = [
  { address: '0x1234...5678', contribution: '10', rewards: '1000', eligible: true },
  { address: '0x8765...4321', contribution: '10', rewards: '1000', eligible: true },
  { address: '0xabcd...efgh', contribution: '10', rewards: '1000', eligible: false },
];

const BootstrapBay: React.FC = () => {
  const { account, isConnected, contracts } = useWeb3();
  const { success, error } = useToastContext();
  const [bootstrapInfo, setBootstrapInfo] = useState<BootstrapInfo>({
    hasBootstrapped: false,
    contribution: '0',
    totalContributions: '0',
    participants: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [participants, setParticipants] = useState(MOCK_BOOTSTRAP_PARTICIPANTS);

  // Fetch bootstrap information when account changes
  useEffect(() => {
    if (isConnected && account && contracts.bootstrapBay) {
      fetchBootstrapInfo();
      fetchParticipants();
    }
  }, [isConnected, account, contracts.bootstrapBay]);

  const fetchBootstrapInfo = async () => {
    try {
      setIsLoading(true);
      // In a real implementation, this would call the contract
      // const hasBootstrapped = await contracts.bootstrapBay.hasBootstrapped(account);
      // const contribution = await contracts.bootstrapBay.contributions(account);
      // const totalContributions = await contracts.bootstrapBay.totalContributions();
      // const participants = await contracts.bootstrapBay.participantCount();
      
      // For now, using mock data
      setBootstrapInfo({
        hasBootstrapped: false,
        contribution: '0',
        totalContributions: '1000',
        participants: 30
      });
    } catch (err) {
      console.error('Error fetching bootstrap info:', err);
      error('Failed to load bootstrap information');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchParticipants = async () => {
    try {
      // This would be replaced with actual contract calls
      // const participantAddresses = await contracts.bootstrapBay.getParticipants();
      // const participantDetails = await Promise.all(
      //   participantAddresses.map(async (address) => {
      //     const contribution = await contracts.bootstrapBay.contributions(address);
      //     const eligible = await contracts.bootstrapBay.isEligibleForReward(address);
      //     return { address, contribution, eligible };
      //   })
      // );
      
      // Using mock data for now
      setParticipants(MOCK_BOOTSTRAP_PARTICIPANTS);
    } catch (err) {
      console.error('Error fetching participants:', err);
    }
  };

  const handleJoinBootstrap = async () => {
    if (!isConnected) {
      error('Please connect your wallet first');
      return;
    }

    try {
      setIsLoading(true);
      // This would be replaced with the actual contract call
      // await contracts.bootstrapBay.contribute({ value: ethers.utils.parseEther('10') });
      
      // Mock success for now
      success('Successfully joined Bootstrap Bay! You will receive 1000 VAI tokens.');
      setBootstrapInfo(prev => ({
        ...prev,
        hasBootstrapped: true,
        contribution: '10',
        totalContributions: (parseInt(prev.totalContributions) + 10).toString(),
        participants: prev.participants + 1
      }));
    } catch (err) {
      console.error('Error joining bootstrap:', err);
      error('Failed to join Bootstrap Bay');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Bootstrap Bay | VAI Ecosystem" description="Join the VAI Token Bootstrapping Phase">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Bootstrap Bay</h1>
          <p className="text-lg mb-4">
            Join the VAI Ecosystem's initial bootstrapping phase. Contribute 10 USDT and receive 1,000 VAI tokens.
            Early supporters who help bootstrap the ecosystem are eligible for Community Builder Rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="card-body">
              <h3 className="text-xl font-semibold mb-2">Total Contributors</h3>
              <p className="text-3xl font-bold">{bootstrapInfo.participants}</p>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body">
              <h3 className="text-xl font-semibold mb-2">Total Contributions</h3>
              <p className="text-3xl font-bold">{bootstrapInfo.totalContributions} USDT</p>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body">
              <h3 className="text-xl font-semibold mb-2">Your Contribution</h3>
              <p className="text-3xl font-bold">{bootstrapInfo.contribution} USDT</p>
            </div>
          </div>
        </div>

        {!bootstrapInfo.hasBootstrapped && (
          <div className="card mb-8">
            <div className="card-body text-center">
              <h3 className="text-2xl font-bold mb-4">Join the Bootstrapping Phase</h3>
              <p className="mb-6">Contribute 10 USDT and receive 1,000 VAI tokens.</p>
              <button 
                className="btn btn-primary"
                onClick={handleJoinBootstrap}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Join Bootstrap Bay'}
              </button>
            </div>
          </div>
        )}

        <div className="card">
          <div className="card-body">
            <h3 className="text-xl font-semibold mb-4">Bootstrap Participants</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Address</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contribution</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rewards</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {participants.map((participant, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3 text-sm">{participant.address}</td>
                      <td className="px-4 py-3 text-sm">{participant.contribution} USDT</td>
                      <td className="px-4 py-3 text-sm">{participant.rewards} VAI</td>
                      <td className="px-4 py-3 text-sm">
                        {participant.eligible ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                            </svg>
                            Eligible for Reward
                          </span>
                        ) : (
                          <span className="text-gray-500 dark:text-gray-400">Not Eligible</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BootstrapBay;