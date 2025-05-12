/**
 * Web3Context - React Context for managing Web3 wallet connection and blockchain interactions
 * 
 * This context provides:
 * - Wallet connection state
 * - Authentication state
 * - Contract instances
 * - Methods for connecting/disconnecting
 * - Event subscription
 */
import React, { createContext, useContext, useEffect, useReducer, useState, ReactNode } from 'react';
import { ethers } from 'ethers';
import { 
  connectWallet, 
  ensureCorrectNetwork, 
  getAccountBalance, 
  getProvider, 
  formatAddress,
  listenToContractEvents,
  getVAIContract,
  getFieldManagerContract,
  getProposalManagerContract,
  getReferralManagerContract,
  getBootstrapBayContract,
  fixAddressChecksum
} from '@/utils/web3';
import { getAuthData, clearAuthData } from '@/utils/auth';
import { ChildrenProps, ContractEvent } from '@/types';

// Action types for the reducer
enum ActionType {
  SET_PROVIDER = 'SET_PROVIDER',
  SET_ACCOUNT = 'SET_ACCOUNT',
  SET_CONNECTED = 'SET_CONNECTED',
  SET_AUTHENTICATED = 'SET_AUTHENTICATED',
  SET_BALANCE = 'SET_BALANCE',
  SET_NETWORK_ERROR = 'SET_NETWORK_ERROR',
  CLEAR_NETWORK_ERROR = 'CLEAR_NETWORK_ERROR',
  ADD_EVENT = 'ADD_EVENT',
  RESET = 'RESET'
}

// Contracts object interface 
interface ContractsType {
  vaiToken: ethers.Contract | null;
  fieldManager: ethers.Contract | null;
  proposalManager: ethers.Contract | null;
  referralManager: ethers.Contract | null;
  bootstrapBay: ethers.Contract | null;
}

// Web3 state interface
interface Web3State {
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  account: string | null;
  isConnected: boolean;
  isAuthenticated: boolean;
  balance: string;
  networkError: string | null;
  events: ContractEvent[];
}

// Web3 context interface
interface Web3ContextType extends Web3State {
  connect: () => Promise<void>;
  disconnect: () => void;
  contracts: ContractsType;
}

// Create context
const Web3Context = createContext<Web3ContextType | undefined>(undefined);

// Action interface for type-safety
interface Action {
  type: ActionType;
  payload?: any;
}

// Reducer function to handle state updates
const reducer = (state: Web3State, action: Action): Web3State => {
  switch (action.type) {
    case ActionType.SET_PROVIDER:
      return {
        ...state,
        provider: action.payload.provider,
        signer: action.payload.signer
      };
    case ActionType.SET_ACCOUNT:
      return {
        ...state,
        account: action.payload
      };
    case ActionType.SET_CONNECTED:
      return {
        ...state,
        isConnected: action.payload
      };
    case ActionType.SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload
      };
    case ActionType.SET_BALANCE:
      return {
        ...state,
        balance: action.payload
      };
    case ActionType.SET_NETWORK_ERROR:
      return {
        ...state,
        networkError: action.payload
      };
    case ActionType.CLEAR_NETWORK_ERROR:
      return {
        ...state,
        networkError: null
      };
    case ActionType.ADD_EVENT:
      return {
        ...state,
        events: [action.payload, ...state.events.slice(0, 19)] // Keep only last 20 events
      };
    case ActionType.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// Initial state
const initialState: Web3State = {
  provider: null,
  signer: null,
  account: null,
  isConnected: false,
  isAuthenticated: false,
  balance: '0',
  networkError: null,
  events: []
};

// Initial contracts state
const initialContracts: ContractsType = {
  vaiToken: null,
  fieldManager: null,
  proposalManager: null,
  referralManager: null,
  bootstrapBay: null  
};

// Web3 Provider component
export const Web3Provider = ({ children }: { children: ReactNode }): React.ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [contracts, setContracts] = useState<ContractsType>(initialContracts);

  // Initialize provider and check for existing connection
  useEffect(() => {
    const initProvider = async () => {
      try {
        // Check if MetaMask is installed
        if (typeof window !== 'undefined' && window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum as any);
          const signer = provider.getSigner();
          
          dispatch({
            type: ActionType.SET_PROVIDER,
            payload: { provider, signer }
          });

          // Check if already connected
          const accounts = await window.ethereum.request({ method: 'eth_accounts' }) as string[];
          if (accounts && accounts.length > 0) {
            const account = accounts[0];
            
            // Update account and connection status
            dispatch({ type: ActionType.SET_ACCOUNT, payload: account });
            dispatch({ type: ActionType.SET_CONNECTED, payload: true });
            
            // Get balance
            const balance = await getAccountBalance(account);
            dispatch({ type: ActionType.SET_BALANCE, payload: balance });
            
            // Check if authenticated
            const authData = getAuthData();
            if (authData.isAuthenticated && authData.address === account) {
              dispatch({ type: ActionType.SET_AUTHENTICATED, payload: true });
            }
          }
        }
      } catch (error) {
        console.error('Error initializing provider:', error);
      }
    };

    initProvider();
  }, []);

  // Initialize contracts when provider/signer changes
  useEffect(() => {
    if (state.provider && state.signer) {
      try {
        const newContracts: ContractsType = {
          vaiToken: getVAIContract(state.signer),
          fieldManager: getFieldManagerContract(state.signer),
          proposalManager: getProposalManagerContract(state.signer),
          referralManager: getReferralManagerContract(state.signer),
          bootstrapBay: getBootstrapBayContract(state.signer)
        };
        
        setContracts(newContracts);
      } catch (error) {
        console.error('Error initializing contracts:', error);
      }
    } else {
      setContracts(initialContracts);
    }
  }, [state.provider, state.signer]);

  // Listen for account and network changes
  useEffect(() => {
    const handleAccountsChanged = (accounts: unknown) => {
      const accountsArray = accounts as string[];
      if (!accountsArray || accountsArray.length === 0) {
        // User disconnected
        disconnect();
      } else {
        // User switched accounts
        const newAccount = accountsArray[0];
        dispatch({ type: ActionType.SET_ACCOUNT, payload: newAccount });
        
        // Check authentication for new account
        const authData = getAuthData();
        if (authData.isAuthenticated && authData.address === newAccount) {
          dispatch({ type: ActionType.SET_AUTHENTICATED, payload: true });
        } else {
          dispatch({ type: ActionType.SET_AUTHENTICATED, payload: false });
        }
        
        // Update balance
        getAccountBalance(newAccount).then(balance => {
          dispatch({ type: ActionType.SET_BALANCE, payload: balance });
        });
      }
    };

    const handleChainChanged = () => {
      // Reload the page when the chain changes
      window.location.reload();
    };

    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  // Subscribe to contract events when connected
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    if (state.isConnected) {
      const handleContractEvent = (event: ContractEvent) => {
        dispatch({ type: ActionType.ADD_EVENT, payload: event });
      };
      
      unsubscribe = listenToContractEvents(handleContractEvent);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [state.isConnected]);

  // Connect wallet function
  const connect = async () => {
    try {
      dispatch({ type: ActionType.CLEAR_NETWORK_ERROR });
      
      // Check network
      const isCorrectNetwork = await ensureCorrectNetwork();
      if (!isCorrectNetwork) {
        dispatch({
          type: ActionType.SET_NETWORK_ERROR,
          payload: 'Please switch to the correct network'
        });
        return;
      }
      
      // Connect wallet
      const account = await connectWallet();
      
      // Initialize provider and signer
      const provider = getProvider();
      if (!provider) throw new Error('Failed to get provider');
      
      const signer = provider.getSigner();
      
      // Update state
      dispatch({
        type: ActionType.SET_PROVIDER,
        payload: { provider, signer }
      });
      dispatch({ type: ActionType.SET_ACCOUNT, payload: account });
      dispatch({ type: ActionType.SET_CONNECTED, payload: true });
      
      // Get balance
      const balance = await getAccountBalance(account);
      dispatch({ type: ActionType.SET_BALANCE, payload: balance });
      
      // Check if authenticated
      const authData = getAuthData();
      if (authData.isAuthenticated && authData.address === account) {
        dispatch({ type: ActionType.SET_AUTHENTICATED, payload: true });
      }
      
    } catch (error) {
      console.error('Error connecting wallet:', error);
      dispatch({
        type: ActionType.SET_NETWORK_ERROR,
        payload: 'Failed to connect wallet. Please try again.'
      });
    }
  };

  // Disconnect wallet function
  const disconnect = () => {
    // Clear auth data
    clearAuthData();
    
    // Reset state
    dispatch({ type: ActionType.RESET });
  };

  // Provide context value
  const value: Web3ContextType = {
    ...state,
    connect,
    disconnect,
    contracts
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};

// Custom hook to use Web3 context
export const useWeb3 = (): Web3ContextType => {
  const context = useContext(Web3Context);
  
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  
  return context;
};