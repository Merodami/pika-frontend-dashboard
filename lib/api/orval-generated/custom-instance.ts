import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// For client-side, use the proxy route to handle auth
const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use proxy route
    return '/api/proxy';
  }
  // Server-side: direct API call
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5500/api/v1';
};

// Create axios instance with default config
const AXIOS_INSTANCE = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for httpOnly cookies
});

// Request interceptor - simplified for client compatibility
AXIOS_INSTANCE.interceptors.request.use(
  (config) => {
    // Client-side: cookies are automatically sent with withCredentials: true
    // Server-side: this file shouldn't be used, use server-instance instead
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - could trigger token refresh here
      // For now, just reject to let the calling code handle it
    }
    return Promise.reject(error);
  }
);

// Custom instance function that Orval will use
export const customInstance = <T>(
  config: AxiosRequestConfig,
): Promise<T> => {
  return AXIOS_INSTANCE.request<T>(config).then((response) => response.data);
};

// Export the axios instance if needed elsewhere
export default AXIOS_INSTANCE;