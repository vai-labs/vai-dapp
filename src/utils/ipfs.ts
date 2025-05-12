import { create } from 'ipfs-http-client';

const IPFS_API_URL = process.env.NEXT_PUBLIC_IPFS_API_URL || 'https://ipfs.infura.io:5001/api/v0';

// Create an IPFS client instance
const client = create({ url: IPFS_API_URL });

interface ProposalData {
  title: string;
  description: string;
  fieldId: number;
  creator: string;
  timestamp: number;
  type: 'proposal';
}

interface TaskResultData {
  taskId: number;
  result: string;
  submitter: string;
  timestamp: number;
  type: 'taskResult';
}

interface IPFSAddResult {
  path: string;
  cid: any;
  size: number;
}

/**
 * Upload content to IPFS
 * @param content - Content to upload
 * @returns IPFS hash of the uploaded content
 */
export const uploadToIPFS = async (content: object | string | Buffer): Promise<string> => {
  try {
    // If the content is an object, convert it to JSON string
    const data = typeof content === 'object' && !(content instanceof Buffer) 
      ? JSON.stringify(content) 
      : content;
    
    const added = await client.add(data) as IPFSAddResult;
    const ipfsHash = added.path;
    
    return ipfsHash;
  } catch (error: any) {
    console.error('Error uploading to IPFS:', error);
    throw new Error(`Failed to upload to IPFS: ${error.message}`);
  }
};

/**
 * Retrieve content from IPFS
 * @param ipfsHash - IPFS hash of the content
 * @returns Retrieved content
 */
export const retrieveFromIPFS = async (ipfsHash: string): Promise<object | string> => {
  try {
    const url = `https://ipfs.io/ipfs/${ipfsHash}`;
    const response = await fetch(url);
    const data = await response.text();
    
    try {
      // Attempt to parse as JSON
      return JSON.parse(data);
    } catch (parseError) {
      // Return as is if not JSON
      return data;
    }
  } catch (error: any) {
    console.error('Error retrieving from IPFS:', error);
    throw new Error(`Failed to retrieve from IPFS: ${error.message}`);
  }
};

/**
 * Generate IPFS gateway URL for a hash
 * @param ipfsHash - IPFS hash
 * @returns Gateway URL
 */
export const getIPFSGatewayUrl = (ipfsHash: string): string => {
  if (!ipfsHash) return '';
  
  // Use a reliable gateway
  return `https://ipfs.io/ipfs/${ipfsHash}`;
};

interface ProposalInput {
  title: string;
  description: string;
  fieldId: number;
  creator: string;
}

/**
 * Upload a proposal to IPFS
 * @param proposal - Proposal data
 * @returns IPFS hash
 */
export const uploadProposalToIPFS = async (proposal: ProposalInput): Promise<string> => {
  const proposalData: ProposalData = {
    title: proposal.title,
    description: proposal.description,
    fieldId: proposal.fieldId,
    creator: proposal.creator,
    timestamp: Date.now(),
    type: 'proposal'
  };
  
  return await uploadToIPFS(proposalData);
};

interface TaskResultInput {
  taskId: number;
  result: string;
  submitter: string;
}

/**
 * Upload a task result to IPFS
 * @param taskResult - Task result data
 * @returns IPFS hash
 */
export const uploadTaskResultToIPFS = async (taskResult: TaskResultInput): Promise<string> => {
  const taskResultData: TaskResultData = {
    taskId: taskResult.taskId,
    result: taskResult.result,
    submitter: taskResult.submitter,
    timestamp: Date.now(),
    type: 'taskResult'
  };
  
  return await uploadToIPFS(taskResultData);
};