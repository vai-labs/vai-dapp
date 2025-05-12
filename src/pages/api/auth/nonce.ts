import { randomBytes } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  nonce?: string;
  message?: string;
  error?: string;
  details?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Generate a cryptographically secure random nonce
    // This will be used in the SIWE message to prevent replay attacks
    const nonce = randomBytes(16).toString('hex');
    console.log('Generated nonce:', nonce);
    
    // Set nonce in a secure HTTP-only cookie
    // In a production app, you would use a session store
    const cookieValue = `siwe_nonce=${nonce}; HttpOnly; Path=/; Max-Age=300; SameSite=Lax`;
    res.setHeader('Set-Cookie', cookieValue);
    console.log('Set cookie:', cookieValue);
    
    // For development, log existing cookies
    const existingCookies = req.headers.cookie || 'No cookies present';
    console.log('Existing cookies:', existingCookies);
    
    return res.status(200).json({ 
      nonce,
      message: 'Nonce generated successfully. Please sign the message to authenticate.'
    });
  } catch (error: any) {
    console.error('Error generating nonce:', error);
    return res.status(500).json({ 
      error: 'Failed to generate nonce',
      details: error.message || 'Unknown error'
    });
  }
}