/**
 * Common type definitions for the VAI ecosystem
 */

export interface ChildrenProps {
  children: React.ReactNode;
}

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

export interface ToastProps {
  message: string;
  type?: ToastType;
  visible?: boolean;
  onClose: () => void;
}

export interface ContractEvent {
  id: string;
  blockNumber: number;
  transactionHash: string;
  contract: string;
  event: string;
  args: any;
  timestamp: number;
}

export interface ApiResponse<T = any> {
  data: T | null;
  error: string | null;
  status: number;
  success: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  address: string | null;
}

export interface Field {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  stakeholders: number;
  totalStaked: string;
  createdAt: number;
  ipfsHash: string;
}

export interface Proposal {
  id: number;
  title: string;
  description: string;
  fieldId: number;
  proposer: string;
  startTime: number;
  endTime: number;
  forVotes: string;
  againstVotes: string;
  executed: boolean;
  ipfsHash: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  fieldId: number;
  creator: string;
  reward: string;
  deadline: number;
  completed: boolean;
  assignedTo: string | null;
  resultIpfsHash: string | null;
}

export interface StakeInfo {
  fieldId: number;
  amount: string;
  trustScore: number;
  isStakeholder: boolean;
}

export interface ReferralInfo {
  referrer: string | null;
  referrals: number;
  rewards: string;
  qualifiesForReward: boolean;
}

export interface BootstrapInfo {
  hasBootstrapped: boolean;
  contribution: string;
  totalContributions: string;
  participants: number;
}

export interface LeaderboardEntry {
  address: string;
  trustScore: number;
  totalStaked: string;
  fieldCount: number;
  proposalCount: number;
  rank: number;
}

export interface UserActivity {
  id: string;
  type: 'stake' | 'vote' | 'proposal' | 'task' | 'referral' | 'bootstrap';
  description: string;
  amount?: string;
  timestamp: number;
  transactionHash: string;
}

export interface AdaptationScore {
  total: number;
  components: {
    stake: number;
    participation: number;
    contribution: number;
    community: number;
  };
}