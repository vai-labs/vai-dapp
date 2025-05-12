import { getAuthData } from '@/utils/auth';
import { ApiResponse } from '@/types';

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

const API_BASE_URL = '/api';

/**
 * General API fetch utility that handles authentication and error handling
 * @param endpoint - The API endpoint to fetch from
 * @param options - Fetch options
 * @returns The API response
 */
export const fetchAPI = async <T = any>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> => {
  try {
    const { token } = getAuthData();
    
    // Set up headers with authentication token if available
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Prepare the request
    const requestOptions: RequestInit = {
      ...options,
      headers,
    };
    
    // Make the request
    const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);
    
    // Parse the response
    const data = await response.json();
    
    // Check for error
    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'An error occurred',
      };
    }
    
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error('API error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * GET request helper
 * @param endpoint - The API endpoint
 * @param options - Additional fetch options
 * @returns The API response
 */
export const get = <T = any>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> => {
  return fetchAPI<T>(endpoint, {
    method: 'GET',
    ...options,
  });
};

/**
 * POST request helper
 * @param endpoint - The API endpoint
 * @param data - The data to post
 * @param options - Additional fetch options
 * @returns The API response
 */
export const post = <T = any>(endpoint: string, data: any, options: FetchOptions = {}): Promise<ApiResponse<T>> => {
  return fetchAPI<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  });
};

/**
 * PUT request helper
 * @param endpoint - The API endpoint
 * @param data - The data to put
 * @param options - Additional fetch options
 * @returns The API response
 */
export const put = <T = any>(endpoint: string, data: any, options: FetchOptions = {}): Promise<ApiResponse<T>> => {
  return fetchAPI<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
    ...options,
  });
};

/**
 * DELETE request helper
 * @param endpoint - The API endpoint
 * @param options - Additional fetch options
 * @returns The API response
 */
export const del = <T = any>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> => {
  return fetchAPI<T>(endpoint, {
    method: 'DELETE',
    ...options,
  });
};