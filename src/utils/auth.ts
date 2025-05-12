import { ethers } from 'ethers';
import { AuthState } from '@/types';

/**
 * Generates a random nonce for authentication
 * @returns {string} Random nonce
 */
export const generateNonce = (): string => {
  return Math.floor(Math.random() * 1000000).toString();
};

/**
 * Creates a Sign-In with Ethereum (SIWE) message
 * @param {string} address - User's Ethereum address
 * @param {string} nonce - Random nonce
 * @returns {string} SIWE message
 */
export const createSiweMessage = (
  address: string,
  nonce: string
): string => {
  const domain = window.location.host;
  const origin = window.location.origin;
  
  return `${domain} wants you to sign in with your Ethereum account:
${address}

I accept the Terms of Service: ${origin}/terms
URI: ${origin}
Version: 1
Chain ID: 1
Nonce: ${nonce}
Issued At: ${new Date().toISOString()}`;
};

/**
 * Signs a message with the user's wallet
 * @param {string} message - Message to sign
 * @returns {Promise<string>} Signature
 */
export const signMessage = async (message: string): Promise<string> => {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('No Ethereum provider found');
  }
  
  try {
    // Cast window.ethereum to any to avoid TypeScript errors with MetaMask provider
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();
    return await signer.signMessage(message);
  } catch (error) {
    console.error('Error signing message:', error);
    throw new Error('Failed to sign message');
  }
};

/**
 * Verifies a SIWE signature
 * @param {string} message - Original SIWE message
 * @param {string} signature - Message signature
 * @param {string} address - User's Ethereum address
 * @returns {Promise<boolean>} Verification result
 */
export const verifySiweSignature = async (
  message: string,
  signature: string,
  address: string
): Promise<boolean> => {
  try {
    const recoveredAddress = ethers.utils.verifyMessage(message, signature);
    return recoveredAddress.toLowerCase() === address.toLowerCase();
  } catch (error) {
    console.error('Error verifying signature:', error);
    return false;
  }
};

/**
 * Stores authentication data in localStorage
 * @param {string} address - User's Ethereum address
 * @param {string} token - Authentication token
 */
export const storeAuthData = (address: string, token: string): void => {
  const authData: AuthState = {
    isAuthenticated: true,
    token,
    address
  };
  
  localStorage.setItem('authData', JSON.stringify(authData));
};

/**
 * Retrieves authentication data from localStorage
 * @returns {AuthState} Authentication state
 */
export const getAuthData = (): AuthState => {
  const defaultState: AuthState = {
    isAuthenticated: false,
    token: null,
    address: null
  };
  
  if (typeof window === 'undefined') {
    return defaultState;
  }
  
  const storedData = localStorage.getItem('authData');
  if (!storedData) return defaultState;
  
  try {
    const parsedData: AuthState = JSON.parse(storedData);
    return parsedData;
  } catch (error) {
    console.error('Error parsing auth data:', error);
    return defaultState;
  }
};

/**
 * Clears authentication data from localStorage
 */
export const clearAuthData = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authData');
  }
};

/**
 * Stores referrer address in localStorage
 * @param {string} referrerAddress - Referrer's Ethereum address
 */
export const storeReferrer = (referrerAddress: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('referrer', referrerAddress);
  }
};

/**
 * Retrieves referrer address from localStorage
 * @returns {string | null} Referrer address or null
 */
export const getReferrer = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  return localStorage.getItem('referrer');
};