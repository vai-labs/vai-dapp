import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useWeb3 } from '@/context/Web3Context';
import { useToastContext } from '@/context/ToastContext';
import type { Field } from '@/types';
import { ethers } from 'ethers';

// Mock data for development
const MOCK_FIELDS: Field[] = [
  {
    id: 1,
    name: 'Artificial Intelligence Ethics',
    description: 'Research and development of ethical AI guidelines and frameworks.',
    imageUrl: '/images/fields/ai-ethics.jpg',
    stakeholders: 25,
    totalStaked: '50000',
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
    ipfsHash: 'Qm...'
  },
  {
    id: 2,
    name: 'Decentralized Governance',
    description: 'Exploration of governance mechanisms for decentralized communities.',
    imageUrl: '/images/fields/decentralized-governance.jpg',
    stakeholders: 18,
    totalStaked: '35000',
    createdAt: Date.now() - 45 * 24 * 60 * 60 * 1000, // 45 days ago
    ipfsHash: 'Qm...'
  },
  {
    id: 3,
    name: 'Sustainable Technology',
    description: 'Development of technologies that reduce environmental impact.',
    imageUrl: '/images/fields/sustainable-tech.jpg',
    stakeholders: 12,
    totalStaked: '28000',
    createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000, // 15 days ago
    ipfsHash: 'Qm...'
  }
];

const FieldsPage: React.FC = () => {
  const router = useRouter();
  const { account, isConnected, contracts } = useWeb3();
  const { success, error } = useToastContext();
  const [fields, setFields] = useState<Field[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newField, setNewField] = useState({
    name: '',
    description: '',
    minimumStake: '1000'
  });

  // Fetch fields when component mounts or account changes
  useEffect(() => {
    fetchFields();
  }, [isConnected, contracts.fieldManager]);

  const fetchFields = async () => {
    try {
      setIsLoading(true);
      // This would be replaced with actual contract calls
      // const fieldCount = await contracts.fieldManager.getFieldCount();
      // const fieldIds = Array.from({ length: fieldCount.toNumber() }, (_, i) => i + 1);
      // const fieldsData = await Promise.all(
      //   fieldIds.map(async (id) => {
      //     const field = await contracts.fieldManager.getField(id);
      //     return {
      //       id: id,
      //       name: field.name,
      //       description: field.description,
      //       imageUrl: `/images/fields/field-${id}.jpg`,
      //       stakeholders: await contracts.fieldManager.getStakeholderCount(id),
      //       totalStaked: ethers.utils.formatEther(await contracts.fieldManager.getTotalStaked(id)),
      //       createdAt: field.createdAt.toNumber() * 1000,
      //       ipfsHash: field.ipfsHash
      //     };
      //   })
      // );
      
      // Using mock data for development
      setFields(MOCK_FIELDS);
    } catch (err) {
      console.error('Error fetching fields:', err);
      error('Failed to load fields');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateField = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      error('Please connect your wallet first');
      return;
    }

    if (!newField.name || !newField.description || !newField.minimumStake) {
      error('Please fill in all required fields');
      return;
    }

    try {
      setIsLoading(true);
      // This would be replaced with the actual contract call
      // const minimumStakeWei = ethers.utils.parseEther(newField.minimumStake);
      // await contracts.fieldManager.createField(
      //   newField.name,
      //   newField.description,
      //   minimumStakeWei,
      //   ipfsHash // This would come from IPFS upload
      // );
      
      // Mock success for now
      success(`Field "${newField.name}" created successfully!`);
      
      // Add the new field to the list (in a real app, we'd refetch from the contract)
      const newFieldObj: Field = {
        id: fields.length + 1,
        name: newField.name,
        description: newField.description,
        imageUrl: '/images/fields/default.jpg',
        stakeholders: 1,
        totalStaked: newField.minimumStake,
        createdAt: Date.now(),
        ipfsHash: 'Qm...'
      };
      
      setFields(prev => [...prev, newFieldObj]);
      setNewField({ name: '', description: '', minimumStake: '1000' });
      setShowCreateForm(false);
    } catch (err) {
      console.error('Error creating field:', err);
      error('Failed to create field');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinField = async (fieldId: number) => {
    if (!isConnected) {
      error('Please connect your wallet first');
      return;
    }

    try {
      setIsLoading(true);
      // This would be replaced with the actual contract call
      // const minimumStake = await contracts.fieldManager.getMinimumStake(fieldId);
      // await contracts.fieldManager.stakeInField(fieldId, minimumStake);
      
      // Mock success for now
      success('Successfully joined the field!');
      
      // Navigate to the field detail page
      router.push(`/fields/${fieldId}`);
    } catch (err) {
      console.error('Error joining field:', err);
      error('Failed to join field');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewField(prev => ({ ...prev, [name]: value }));
  };

  // Format timestamp to readable date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  // Format stake amounts to readable format
  const formatStake = (stakeAmount: string) => {
    return parseFloat(stakeAmount).toLocaleString() + ' VAI';
  };

  return (
    <Layout title="Fields | VAI Ecosystem" description="Explore and join fields in the VAI ecosystem">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Fields</h1>
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            {showCreateForm ? 'Cancel' : 'Create Field'}
          </button>
        </div>

        {showCreateForm && (
          <div className="card mb-8">
            <div className="card-body">
              <h2 className="text-xl font-semibold mb-4">Create a New Field</h2>
              <form onSubmit={handleCreateField}>
                <div className="mb-4">
                  <label htmlFor="name" className="label">Field Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="input"
                    value={newField.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="description" className="label">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="input"
                    value={newField.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="minimumStake" className="label">Minimum Stake (VAI)</label>
                  <input
                    type="number"
                    id="minimumStake"
                    name="minimumStake"
                    min="100"
                    className="input"
                    value={newField.minimumStake}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating...' : 'Create Field'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isLoading && fields.length === 0 ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4">Loading fields...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map(field => (
              <div key={field.id} className="card">
                <div className="h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img 
                    src={field.imageUrl || '/images/fields/placeholder.jpg'}
                    alt={field.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/fields/placeholder.jpg';
                    }}
                  />
                </div>
                <div className="card-body">
                  <h3 className="text-xl font-semibold mb-2">{field.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{field.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Stakeholders</p>
                      <p className="font-semibold">{field.stakeholders}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Staked</p>
                      <p className="font-semibold">{formatStake(field.totalStaked)}</p>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Created {formatDate(field.createdAt)}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link href={`/fields/${field.id}`} className="btn btn-secondary flex-1">
                      View Details
                    </Link>
                    <button 
                      className="btn btn-primary flex-1"
                      onClick={() => handleJoinField(field.id)}
                    >
                      Join Field
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && fields.length === 0 && (
          <div className="text-center py-8">
            <p className="text-lg mb-4">No fields have been created yet.</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowCreateForm(true)}
            >
              Create the First Field
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FieldsPage;