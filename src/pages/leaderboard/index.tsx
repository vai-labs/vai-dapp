import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useWeb3 } from '@/context/Web3Context';
import type { LeaderboardEntry } from '@/types';

// Mock leaderboard data
const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    address: '0x1234...5678',
    trustScore: 95,
    totalStaked: '85000',
    fieldCount: 3,
    proposalCount: 7,
    rank: 1
  },
  {
    address: '0x8765...4321',
    trustScore: 87,
    totalStaked: '72000',
    fieldCount: 2,
    proposalCount: 5,
    rank: 2
  },
  {
    address: '0xabcd...efgh',
    trustScore: 82,
    totalStaked: '65000',
    fieldCount: 3,
    proposalCount: 4,
    rank: 3
  },
  {
    address: '0x9876...5432',
    trustScore: 78,
    totalStaked: '58000',
    fieldCount: 2,
    proposalCount: 3,
    rank: 4
  },
  {
    address: '0xfedc...ba98',
    trustScore: 72,
    totalStaked: '45000',
    fieldCount: 1,
    proposalCount: 2,
    rank: 5
  },
  {
    address: '0x2468...1357',
    trustScore: 68,
    totalStaked: '38000',
    fieldCount: 2,
    proposalCount: 1,
    rank: 6
  },
  {
    address: '0x1357...2468',
    trustScore: 62,
    totalStaked: '32000',
    fieldCount: 1,
    proposalCount: 1,
    rank: 7
  },
  {
    address: '0xaaaa...bbbb',
    trustScore: 55,
    totalStaked: '25000',
    fieldCount: 1,
    proposalCount: 0,
    rank: 8
  },
  {
    address: '0xcccc...dddd',
    trustScore: 48,
    totalStaked: '18000',
    fieldCount: 1,
    proposalCount: 0,
    rank: 9
  },
  {
    address: '0xeeee...ffff',
    trustScore: 42,
    totalStaked: '12000',
    fieldCount: 1,
    proposalCount: 0,
    rank: 10
  }
];

const LeaderboardPage: React.FC = () => {
  const { account } = useWeb3();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'all'>('all');

  useEffect(() => {
    fetchLeaderboard();
  }, [timeframe]);

  const fetchLeaderboard = async () => {
    try {
      setIsLoading(true);
      // This would be replaced with actual API or contract calls
      // const leaderboardData = await api.get(`/leaderboard?timeframe=${timeframe}`);
      
      // Using mock data for development
      // In a real app, we would filter by timeframe
      setLeaderboard(MOCK_LEADERBOARD);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeframeChange = (newTimeframe: 'week' | 'month' | 'all') => {
    setTimeframe(newTimeframe);
  };

  // Format stake amounts to readable format
  const formatStake = (stakeAmount: string) => {
    return parseFloat(stakeAmount).toLocaleString() + ' VAI';
  };

  // Helper to determine if an entry corresponds to the current user
  const isCurrentUser = (address: string) => {
    if (!account) return false;
    return address.toLowerCase().includes(account.toLowerCase().substring(2, 6));
  };

  return (
    <Layout title="Leaderboard | VAI Ecosystem" description="View top contributors in the VAI ecosystem">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Contributor Leaderboard</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Recognize the top contributors within the VAI ecosystem based on trust scores, staking, and participation.
          </p>
        </div>

        <div className="flex justify-end mb-6">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                timeframe === 'week'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={() => handleTimeframeChange('week')}
            >
              This Week
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                timeframe === 'month'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={() => handleTimeframeChange('month')}
            >
              This Month
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                timeframe === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={() => handleTimeframeChange('all')}
            >
              All Time
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4">Loading leaderboard...</p>
          </div>
        ) : (
          <div className="card">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Trust Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Total Staked
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Fields
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Proposals
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {leaderboard.map((entry) => (
                    <tr 
                      key={entry.rank}
                      className={isCurrentUser(entry.address) ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {entry.rank <= 3 ? (
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full mr-2 ${
                              entry.rank === 1 
                                ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-300' 
                                : entry.rank === 2 
                                ? 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300' 
                                : 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-300'
                            }`}>
                              {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                            </div>
                          ) : (
                            <div className="w-8 h-8 flex items-center justify-center mr-2">
                              {entry.rank}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium">
                          {entry.address}
                          {isCurrentUser(entry.address) && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                              You
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full max-w-xs bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${entry.trustScore}%` }}></div>
                          </div>
                          <span className="text-sm font-medium">{entry.trustScore}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {formatStake(entry.totalStaked)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {entry.fieldCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {entry.proposalCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">About the Leaderboard</h2>
          <div className="card">
            <div className="card-body">
              <p className="mb-4">
                The VAI Ecosystem Leaderboard recognizes the most active and valuable contributors based on several factors:
              </p>
              
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong>Trust Score:</strong> Calculated based on staking activity, proposal participation, and community contributions.</li>
                <li><strong>Staking:</strong> The total amount of VAI tokens staked across all fields.</li>
                <li><strong>Fields:</strong> The number of knowledge fields the user has participated in.</li>
                <li><strong>Proposals:</strong> The number of proposals created or voted on.</li>
              </ul>
              
              <p>
                Leaderboard rankings are updated daily. Contributions made within the selected timeframe are weighted more heavily to encourage continuous participation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LeaderboardPage;