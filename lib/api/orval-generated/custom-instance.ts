import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';

// Create axios instance with default config
const AXIOS_INSTANCE = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5500/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth
AXIOS_INSTANCE.interceptors.request.use(
  async (config) => {
    // Add auth token from cookies
    if (typeof window === 'undefined') {
      // Server-side: get token from cookies
      try {
        const cookieStore = await cookies();
        const token = cookieStore.get('pika-access-token')?.value;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {
        // Not in Next.js server context
      }
    }
    // Client-side: httpOnly cookies are handled automatically by browser
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