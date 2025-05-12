import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useWeb3 } from '@/context/Web3Context';
import { useToastContext } from '@/context/ToastContext';
import type { Task, Field } from '@/types';

// Mock fields data
const MOCK_FIELDS: Record<string, Field> = {
  '1': {
    id: 1,
    name: 'Artificial Intelligence Ethics',
    description: 'Research and development of ethical AI guidelines and frameworks.',
    imageUrl: '/images/fields/ai-ethics.jpg',
    stakeholders: 25,
    totalStaked: '50000',
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
    ipfsHash: 'Qm...'
  },
  '2': {
    id: 2,
    name: 'Decentralized Governance',
    description: 'Exploration of governance mechanisms for decentralized communities.',
    imageUrl: '/images/fields/decentralized-governance.jpg',
    stakeholders: 18,
    totalStaked: '35000',
    createdAt: Date.now() - 45 * 24 * 60 * 60 * 1000,
    ipfsHash: 'Qm...'
  },
  '3': {
    id: 3,
    name: 'Sustainable Technology',
    description: 'Development of technologies that reduce environmental impact.',
    imageUrl: '/images/fields/sustainable-tech.jpg',
    stakeholders: 12,
    totalStaked: '28000',
    createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
    ipfsHash: 'Qm...'
  }
};

// Mock tasks data
const MOCK_TASKS: Task[] = [
  {
    id: 1,
    title: 'Create Bias Detection Algorithm',
    description: 'Develop an algorithm that can detect and quantify bias in AI training data and models.',
    fieldId: 1,
    creator: '0x1234...5678',
    reward: '5000',
    deadline: Date.now() + 14 * 24 * 60 * 60 * 1000, // 14 days from now
    completed: false,
    assignedTo: null,
    resultIpfsHash: null
  },
  {
    id: 2,
    title: 'Governance Participation Analysis',
    description: 'Analyze participation rates in decentralized governance systems and propose improvements.',
    fieldId: 2,
    creator: '0x8765...4321',
    reward: '3500',
    deadline: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days from now
    completed: false,
    assignedTo: '0x9876...5432',
    resultIpfsHash: null
  },
  {
    id: 3,
    title: 'Energy Consumption Benchmarking',
    description: 'Benchmark energy consumption of various consensus algorithms and propose optimizations.',
    fieldId: 3,
    creator: '0xabcd...efgh',
    reward: '4000',
    deadline: Date.now() + 21 * 24 * 60 * 60 * 1000, // 21 days from now
    completed: false,
    assignedTo: null,
    resultIpfsHash: null
  },
  {
    id: 4,
    title: 'Ethics Guidelines Draft',
    description: 'Draft a comprehensive set of ethical guidelines for AI development in healthcare.',
    fieldId: 1,
    creator: '0x1234...5678',
    reward: '6000',
    deadline: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
    completed: true,
    assignedTo: '0x8765...4321',
    resultIpfsHash: 'Qm...'
  }
];

const TasksPage: React.FC = () => {
  const router = useRouter();
  const { fieldId: queryFieldId } = router.query;
  const { account, isConnected, contracts } = useWeb3();
  const { success, error } = useToastContext();
  
  const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);
  const [userFields, setUserFields] = useState<Field[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    fieldId: 0,
    reward: '1000',
    deadline: ''
  });

  // Initialize selected field from query parameter
  useEffect(() => {
    if (queryFieldId && !isNaN(Number(queryFieldId))) {
      setSelectedFieldId(Number(queryFieldId));
    }
  }, [queryFieldId]);

  // Fetch user's staked fields when connected
  useEffect(() => {
    if (isConnected && account) {
      fetchUserFields();
    } else {
      // If not connected, show all fields
      setUserFields(Object.values(MOCK_FIELDS));
    }
  }, [isConnected, account, contracts.fieldManager]);

  // Fetch tasks when field is selected
  useEffect(() => {
    if (selectedFieldId) {
      fetchTasks(selectedFieldId);
    }
  }, [selectedFieldId, contracts.fieldManager]);

  const fetchUserFields = async () => {
    try {
      setIsLoading(true);
      // This would be replaced with actual contract calls
      // const fieldCount = await contracts.fieldManager.getFieldCount();
      // const fieldIds = Array.from({ length: fieldCount.toNumber() }, (_, i) => i + 1);
      // const userFieldsData = await Promise.all(
      //   fieldIds.map(async (id) => {
      //     const isStakeholder = await contracts.fieldManager.isStakeholder(id, account);
      //     if (!isStakeholder) return null;
      //     
      //     const field = await contracts.fieldManager.getField(id);
      //     return {
      //       id,
      //       name: field.name,
      //       description: field.description,
      //       // ... other field properties
      //     };
      //   })
      // );
      // const filteredFields = userFieldsData.filter(field => field !== null);
      
      // Using mock data for development
      const userFieldIds = [1, 2]; // Assume user has staked in these fields
      const fields = userFieldIds.map(id => MOCK_FIELDS[id.toString()]);
      setUserFields(fields);
      
      // If no field is selected yet, select the first one
      if (!selectedFieldId && fields.length > 0) {
        setSelectedFieldId(fields[0].id);
        setNewTask(prev => ({ ...prev, fieldId: fields[0].id }));
      }
    } catch (err) {
      console.error('Error fetching user fields:', err);
      error('Failed to load your staked fields');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTasks = async (fieldId: number) => {
    try {
      setIsLoading(true);
      // This would be replaced with actual contract calls
      // const taskCount = await contracts.taskManager.getTaskCount(fieldId);
      // const taskIds = Array.from({ length: taskCount.toNumber() }, (_, i) => i + 1);
      // const tasksData = await Promise.all(
      //   taskIds.map(async (id) => {
      //     const task = await contracts.taskManager.getTask(fieldId, id);
      //     return {
      //       id,
      //       title: task.title,
      //       description: task.description,
      //       fieldId,
      //       creator: task.creator,
      //       reward: ethers.utils.formatEther(task.reward),
      //       deadline: task.deadline.toNumber() * 1000,
      //       completed: task.completed,
      //       assignedTo: task.assignedTo === ethers.constants.AddressZero ? null : task.assignedTo,
      //       resultIpfsHash: task.resultIpfsHash || null
      //     };
      //   })
      // );
      
      // Using mock data for development
      const filteredTasks = MOCK_TASKS.filter(t => t.fieldId === fieldId);
      setTasks(filteredTasks);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      error('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      error('Please connect your wallet first');
      return;
    }

    if (!newTask.title || !newTask.description || !newTask.reward || !newTask.deadline) {
      error('Please fill in all required fields');
      return;
    }

    try {
      setIsLoading(true);
      // This would be replaced with the actual contract call
      // const deadlineTimestamp = Math.floor(new Date(newTask.deadline).getTime() / 1000);
      // const rewardWei = ethers.utils.parseEther(newTask.reward);
      // 
      // await contracts.taskManager.createTask(
      //   selectedFieldId,
      //   newTask.title,
      //   newTask.description,
      //   rewardWei,
      //   deadlineTimestamp
      // );
      
      // Mock success for now
      success(`Task "${newTask.title}" created successfully!`);
      
      // Add the new task to the list (in a real app, we'd refetch from the contract)
      const deadlineDate = new Date(newTask.deadline).getTime();
      const newTaskObj: Task = {
        id: tasks.length + 1,
        title: newTask.title,
        description: newTask.description,
        fieldId: selectedFieldId!,
        creator: account || '0x0000',
        reward: newTask.reward,
        deadline: deadlineDate,
        completed: false,
        assignedTo: null,
        resultIpfsHash: null
      };
      
      setTasks(prev => [...prev, newTaskObj]);
      setNewTask({ 
        title: '', 
        description: '', 
        fieldId: selectedFieldId || 0, 
        reward: '1000', 
        deadline: '' 
      });
      setShowCreateForm(false);
    } catch (err) {
      console.error('Error creating task:', err);
      error('Failed to create task');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptTask = async (taskId: number) => {
    if (!isConnected) {
      error('Please connect your wallet first');
      return;
    }

    try {
      setIsLoading(true);
      // This would be replaced with the actual contract call
      // await contracts.taskManager.acceptTask(selectedFieldId, taskId);
      
      // Mock success for now
      success(`You have accepted task #${taskId}!`);
      
      // Update task status (in a real app, we'd refetch from the contract)
      setTasks(prev => prev.map(t => {
        if (t.id === taskId) {
          return { ...t, assignedTo: account || null };
        }
        return t;
      }));
    } catch (err) {
      console.error('Error accepting task:', err);
      error('Failed to accept task');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitResult = async (taskId: number) => {
    if (!isConnected) {
      error('Please connect your wallet first');
      return;
    }

    // In a real app, this would open a form to upload results to IPFS
    // For now, just mock the submission
    try {
      setIsLoading(true);
      // This would be replaced with the actual contract call
      // const resultIpfsHash = await uploadTaskResultToIPFS({
      //   taskId,
      //   result: "Task completed successfully",
      //   submitter: account
      // });
      // 
      // await contracts.taskManager.submitTaskResult(selectedFieldId, taskId, resultIpfsHash);
      
      // Mock success for now
      success(`Result for task #${taskId} submitted successfully!`);
      
      // Update task status (in a real app, we'd refetch from the contract)
      setTasks(prev => prev.map(t => {
        if (t.id === taskId) {
          return { ...t, resultIpfsHash: 'Qm...' };
        }
        return t;
      }));
    } catch (err) {
      console.error('Error submitting task result:', err);
      error('Failed to submit task result');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fieldId = parseInt(e.target.value);
    setSelectedFieldId(fieldId);
    setNewTask(prev => ({ ...prev, fieldId }));
  };

  // Format timestamp to readable date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  // Calculate task status
  const getTaskStatus = (task: Task) => {
    const now = Date.now();
    
    if (task.completed) {
      return { label: 'Completed', color: 'badge-green' };
    }
    if (task.resultIpfsHash) {
      return { label: 'Result Submitted', color: 'badge-blue' };
    }
    if (task.assignedTo) {
      return { label: 'In Progress', color: 'badge-yellow' };
    }
    if (now > task.deadline) {
      return { label: 'Expired', color: 'badge-red' };
    }
    
    return { label: 'Open', color: 'badge-green' };
  };

  // Check if the current user is assigned to a task
  const isUserAssigned = (task: Task) => {
    return task.assignedTo === account;
  };

  return (
    <Layout title="Tasks | VAI Ecosystem" description="View and contribute to tasks in the VAI ecosystem">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Tasks</h1>

        <div className="card mb-8">
          <div className="card-body">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Tasks Management</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Browse and contribute to tasks across various fields in the VAI ecosystem.
                </p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <label htmlFor="fieldSelect" className="label block mb-2">Select Field</label>
                <select
                  id="fieldSelect"
                  className="input w-full md:w-64"
                  value={selectedFieldId || ''}
                  onChange={handleFieldChange}
                >
                  <option value="">Select a field</option>
                  {Object.values(MOCK_FIELDS).map(field => (
                    <option key={field.id} value={field.id}>
                      {field.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {isConnected && (
              <div className="flex justify-end">
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  disabled={!selectedFieldId}
                >
                  {showCreateForm ? 'Cancel' : 'Create Task'}
                </button>
              </div>
            )}
          </div>
        </div>

        {showCreateForm && (
          <div className="card mb-8">
            <div className="card-body">
              <h2 className="text-xl font-semibold mb-4">Create a New Task</h2>
              <form onSubmit={handleCreateTask}>
                <div className="mb-4">
                  <label htmlFor="title" className="label">Task Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="input"
                    value={newTask.title}
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
                    value={newTask.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="reward" className="label">Reward (VAI)</label>
                    <input
                      type="number"
                      id="reward"
                      name="reward"
                      min="100"
                      className="input"
                      value={newTask.reward}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="deadline" className="label">Deadline</label>
                    <input
                      type="date"
                      id="deadline"
                      name="deadline"
                      className="input"
                      value={newTask.deadline}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating...' : 'Create Task'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {selectedFieldId ? (
          isLoading && tasks.length === 0 ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-4">Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg mb-4">No tasks have been created for this field yet.</p>
              {isConnected && (
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowCreateForm(true)}
                >
                  Create the First Task
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {tasks.map(task => {
                const status = getTaskStatus(task);
                const userIsAssigned = isUserAssigned(task);
                const canAccept = !task.assignedTo && !task.completed && Date.now() <= task.deadline;
                const canSubmit = userIsAssigned && !task.resultIpfsHash && Date.now() <= task.deadline;
                
                return (
                  <div key={task.id} className="card">
                    <div className="card-body">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold">{task.title}</h3>
                        <div className={`badge ${status.color} ml-0 md:ml-2 mt-2 md:mt-0`}>
                          {status.label}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {task.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Creator</p>
                          <p className="font-medium">{task.creator}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Reward</p>
                          <p className="font-medium">{parseFloat(task.reward).toLocaleString()} VAI</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Deadline</p>
                          <p className="font-medium">{formatDate(task.deadline)}</p>
                        </div>
                      </div>
                      
                      {task.assignedTo && (
                        <div className="mb-6">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Assigned To</p>
                          <p className="font-medium">{task.assignedTo}</p>
                        </div>
                      )}
                      
                      {isConnected && (canAccept || canSubmit) && (
                        <div className="flex space-x-2">
                          {canAccept && (
                            <button 
                              className="btn btn-primary flex-1"
                              onClick={() => handleAcceptTask(task.id)}
                            >
                              Accept Task
                            </button>
                          )}
                          
                          {canSubmit && (
                            <button 
                              className="btn btn-primary flex-1"
                              onClick={() => handleSubmitResult(task.id)}
                            >
                              Submit Result
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          <div className="text-center py-8">
            <p>Please select a field to view tasks.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TasksPage;