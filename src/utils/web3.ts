import { ethers } from 'ethers';
import { ContractEvent } from '@/types';

// Import contract ABIs
import vaiTokenABI from '@/contracts/abis/VAI.json';
import fieldManagerABI from '@/contracts/abis/FieldManager.json';
import proposalManagerABI from '@/contracts/abis/ProposalManager.json';
import referralManagerABI from '@/contracts/abis/ReferralManager.json';
import bootstrapBayABI from '@/contracts/abis/BootstrapBay.json';

// Network configuration
export const NETWORK_CONFIG = {
  chainId: '0x1', // Mainnet
  chainName: 'Ethereum Mainnet',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://mainnet.infura.io/v3/YOUR_INFURA_KEY'],
  blockExplorerUrls: ['https://etherscan.io'],
};

// For development/testing, use a testnet (e.g., Goerli)
export const TEST_NETWORK_CONFIG = {
  chainId: '0x5', // Goerli
  chainName: 'Goerli Test Network',
  nativeCurrency: {
    name: 'Goerli Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://goerli.infura.io/v3/YOUR_INFURA_KEY'],
  blockExplorerUrls: ['https://goerli.etherscan.io'],
};

// Check if the crypto wallet is installed
export const isWalletInstalled = (): boolean => {
  return typeof window !== 'undefined' && !!window.ethereum;
};

// Get provider
export const getProvider = (): ethers.providers.Web3Provider | null => {
  if (!isWalletInstalled()) return null;
  
  try {
    return new ethers.providers.Web3Provider(window.ethereum as any);
  } catch (error) {
    console.error('Error getting provider:', error);
    return null;
  }
};

// Connect wallet and get accounts
export const connectWallet = async (): Promise<string> => {
  if (!isWalletInstalled()) {
    throw new Error('No crypto wallet found. Please install MetaMask.');
  }
  
  try {
    // Cast to any to avoid TypeScript errors
    const accounts = await (window.ethereum as any).request({ method: 'eth_requestAccounts' }) as string[];
    
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found.');
    }
    
    return accounts[0];
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw new Error('Failed to connect wallet.');
  }
};

// Ensure correct network
export const ensureCorrectNetwork = async (): Promise<boolean> => {
  if (!isWalletInstalled()) return false;
  
  try {
    // Use test network config for development
    const targetNetwork = process.env.NODE_ENV === 'production' 
      ? NETWORK_CONFIG 
      : TEST_NETWORK_CONFIG;
    
    const chainId = await (window.ethereum as any).request({ method: 'eth_chainId' });
    
    if (chainId !== targetNetwork.chainId) {
      // Request network switch
      try {
        await (window.ethereum as any).request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: targetNetwork.chainId }],
        });
        return true;
      } catch (switchError: any) {
        // Network needs to be added
        if (switchError.code === 4902) {
          try {
            await (window.ethereum as any).request({
              method: 'wallet_addEthereumChain',
              params: [targetNetwork],
            });
            return true;
          } catch (addError) {
            console.error('Error adding network:', addError);
            return false;
          }
        }
        console.error('Error switching network:', switchError);
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error ensuring correct network:', error);
    return false;
  }
};

// Get account balance
export const getAccountBalance = async (address: string): Promise<string> => {
  const provider = getProvider();
  if (!provider) return '0';
  
  try {
    const balance = await provider.getBalance(address);
    return ethers.utils.formatEther(balance);
  } catch (error) {
    console.error('Error getting balance:', error);
    return '0';
  }
};

// Format address for display
export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

// Fix address checksum
export const fixAddressChecksum = (address: string): string => {
  try {
    return ethers.utils.getAddress(address);
  } catch (error) {
    console.error('Error fixing address checksum:', error);
    return address;
  }
};

// Get contract instances
export const getVAIContract = (signer: ethers.Signer): ethers.Contract => {
  return new ethers.Contract(
    vaiTokenABI.address,
    vaiTokenABI.abi,
    signer
  );
};

export const getFieldManagerContract = (signer: ethers.Signer): ethers.Contract => {
  return new ethers.Contract(
    fieldManagerABI.address,
    fieldManagerABI.abi,
    signer
  );
};

export const getProposalManagerContract = (signer: ethers.Signer): ethers.Contract => {
  return new ethers.Contract(
    proposalManagerABI.address,
    proposalManagerABI.abi,
    signer
  );
};

export const getReferralManagerContract = (signer: ethers.Signer): ethers.Contract => {
  return new ethers.Contract(
    referralManagerABI.address,
    referralManagerABI.abi,
    signer
  );
};

export const getBootstrapBayContract = (signer: ethers.Signer): ethers.Contract => {
  return new ethers.Contract(
    bootstrapBayABI.address,
    bootstrapBayABI.abi,
    signer
  );
};

// Listen to contract events
export const listenToContractEvents = (
  callback: (event: ContractEvent) => void
): (() => void) => {
  // Since we're working with a development environment without a proper
  // contract deployment, we're returning a dummy cleanup function to avoid errors
  // In a real environment, this would be connected to actual contract events
  
  // For development, we can use dummy data for demonstration purposes
  // In production, this function would properly connect to contract events
  return () => {
    // Cleanup function
    console.log('Contract event listeners removed.');
  };
};

// DEVELOPMENT-ONLY FUNCTION: This would be removed in production
// This simulates a contract event for development purposes
export const simulateContractEvent = (eventType: string, callback: (event: ContractEvent) => void) => {
  // Sample event data for development purposes
  const dummyEvent = {
    id: `${eventType}-${Date.now()}`,
    blockNumber: 123456,
    transactionHash: '0x123456789abcdef',
    contract: 'VAI Token',
    event: eventType,
    args: { from: '0x123...', to: '0x456...', amount: '100.0' },
    timestamp: Math.floor(Date.now() / 1000),
  };
  
  callback(dummyEvent);
};