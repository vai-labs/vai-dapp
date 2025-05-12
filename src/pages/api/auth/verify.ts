import { SiweMessage } from 'siwe';
import { ethers } from 'ethers';
import { randomBytes } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';

type RequestBody = {
  message: string;
  signature: string;
};

type ResponseData = {
  success: boolean;
  address?: string;
  token?: string;
  error?: string;
  details?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { message, signature } = req.body as RequestBody;
    
    // Log the received message and signature for debugging
    console.log('Received message:', message);
    console.log('Received signature:', signature);
    
    // Parse cookies to get the nonce
    const cookies = req.headers.cookie?.split(';') || [];
    const nonceCookie = cookies.find(cookie => cookie.trim().startsWith('siwe_nonce='));
    const nonce = nonceCookie?.split('=')[1];
    
    console.log('Retrieved nonce from cookie:', nonce);
    
    if (!nonce) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid nonce. Please refresh and try again.' 
      });
    }
    
    // Create SIWE message object
    const siweMessage = new SiweMessage(message);
    
    // Log the parsed message object for debugging
    console.log('Parsed SIWE message:', siweMessage);
    
    // Directly use ethers.js to verify the signature instead of SIWE library
    // This provides more direct control over the verification process
    try {
      // Recover the address from the signature
      const recoveredAddress = ethers.utils.verifyMessage(message, signature);
      console.log('Recovered address from signature:', recoveredAddress);
      
      // Compare the recovered address with the one in the message (case-insensitive)
      if (recoveredAddress.toLowerCase() !== siweMessage.address.toLowerCase()) {
        console.error('Address mismatch. Recovered:', recoveredAddress, 'Expected:', siweMessage.address);
        throw new Error('Signature does not match the expected address');
      }
      
      // Verify the nonce matches
      if (siweMessage.nonce !== nonce) {
        console.log('Nonce mismatch. Message nonce:', siweMessage.nonce, 'Cookie nonce:', nonce);
        return res.status(422).json({ 
          success: false, 
          error: 'Invalid nonce' 
        });
      }
      
      console.log('Verification successful, address:', recoveredAddress);
      
      // Convert address to checksum format
      const checksumAddress = ethers.utils.getAddress(recoveredAddress);
      console.log('Converted to checksum address:', checksumAddress);
      
      // Generate a JWT token or session id (using random bytes as a simple token here)
      // In a production app, you should use a proper JWT with expiration
      const token = randomBytes(32).toString('hex');
      
      // Clear the nonce cookie as it's been used
      res.setHeader('Set-Cookie', 'siwe_nonce=; Path=/; Max-Age=0');
      
      // Return success with auth token
      return res.status(200).json({
        success: true,
        address: checksumAddress,
        token
      });
    } catch (verifyError: any) {
      console.error('Signature verification error:', verifyError);
      throw verifyError;
    }
  } catch (error: any) {
    console.error('SIWE verification error:', error);
    
    // Provide more detailed error information
    const errorDetail = typeof error === 'object' ? 
      JSON.stringify(error, Object.getOwnPropertyNames(error)) : String(error);
    
    console.error('Detailed error:', errorDetail);
    
    return res.status(400).json({ 
      success: false, 
      error: `Error verifying signature: ${error.message || 'Unknown error'}`,
      details: errorDetail
    });
  }
}