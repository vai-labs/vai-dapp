import { useState, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from '@/context/Web3Context';
import { generateNonce, createSiweMessage, signMessage, storeAuthData, clearAuthData, getAuthData } from '@/utils/auth';
import { post } from '@/lib/api';

interface User {
  address: string | null;
  isAuthenticated: boolean;
}

interface UseAuthReturn {
  isLoading: boolean;
  error: string | null;
  login: () => Promise<boolean>;
  logout: () => void;
  user: User;
}

/**
 * Custom hook for authentication with Sign-In with Ethereum (SIWE)
 * @returns {UseAuthReturn} Authentication methods and state
 */
const useAuth = (): UseAuthReturn => {
  const { account, isConnected, disconnect, setAuthenticated } = useWeb3();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Check if already authenticated on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const { address, token, timestamp } = getAuthData();
      
      // If we have auth data and it's for the currently connected account
      if (address && token && timestamp && account && address.toLowerCase() === account.toLowerCase()) {
        // Check if token is expired (24 hours)
        const now = Date.now();
        const expiry = timestamp + 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        
        if (now < expiry) {
          setAuthenticated(true);
        } else {
          // Token expired
          clearAuthData();
          setAuthenticated(false);
        }
      } else {
        setAuthenticated(false);
      }
    };
    
    if (isConnected && account) {
      checkAuthStatus();
    }
  }, [account, isConnected, setAuthenticated]);
  
  /**
   * Sign in with Ethereum
   * @returns {Promise<boolean>} Success status
   */
  const login = useCallback(async (): Promise<boolean> => {
    if (!account || !isConnected) {
      setError('Wallet not connected');
      return false;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // 1. Get nonce from server
      const nonceResponse = await post<{ nonce: string }>('/auth/nonce', { address: account });
      
      if (!nonceResponse.success || !nonceResponse.data) {
        throw new Error(nonceResponse.error || 'Failed to get nonce');
      }
      
      const { nonce } = nonceResponse.data;
      
      // 2. Create SIWE message
      const message = createSiweMessage(
        account,
        'Sign in to VAI DApp with your Ethereum account.',
        nonce
      );
      
      // 3. Sign the message
      const signature = await signMessage(message.prepareMessage());
      
      // 4. Verify signature
      const verifyResponse = await post<{ token: string }>('/auth/verify', {
        message: message.prepareMessage(),
        signature,
        address: account
      });
      
      if (!verifyResponse.success || !verifyResponse.data) {
        throw new Error(verifyResponse.error || 'Authentication failed');
      }
      
      // 5. Store auth data and update state
      storeAuthData(account, verifyResponse.data.token);
      setAuthenticated(true);
      
      return true;
    } catch (err) {
      console.error('Authentication error:', err);
      setError(err instanceof Error ? err.message : 'Authentication failed');
      setAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [account, isConnected, setAuthenticated]);
  
  /**
   * Sign out
   */
  const logout = useCallback(() => {
    clearAuthData();
    setAuthenticated(false);
    disconnect();
  }, [disconnect, setAuthenticated]);
  
  const user: User = {
    address: account,
    isAuthenticated: isConnected
  };
  
  return {
    isLoading,
    error,
    login,
    logout,
    user
  };
};

export default useAuth;