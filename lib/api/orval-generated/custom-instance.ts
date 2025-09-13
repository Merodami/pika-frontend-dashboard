import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { setupInterceptors } from '@/lib/api/interceptors'

// For client-side, use the proxy route to handle auth
const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use proxy route
    return '/api/proxy'
  }
  // Server-side: direct API call
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5500/api/v1'
}

// Create axios instance with default config
const AXIOS_INSTANCE = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for httpOnly cookies
  timeout: 30000, // 30 second timeout
})

// Add correlation ID and locale to all requests
AXIOS_INSTANCE.interceptors.request.use(
  (config) => {
    // Generate simple correlation ID
    if (!config.headers['x-correlation-id']) {
      config.headers['x-correlation-id'] =
        `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    }

    // Add user context if available (from localStorage/sessionStorage)
    if (typeof window !== 'undefined') {
      const userId = sessionStorage.getItem('userId')
      const sessionId = sessionStorage.getItem('sessionId')

      if (userId) config.headers['x-user-id'] = userId
      if (sessionId) config.headers['x-session-id'] = sessionId
      
      // Add locale from URL path for translation resolution
      const pathSegments = window.location.pathname.split('/')
      const locale = pathSegments[1] // e.g., 'en', 'es', 'gn'
      if (locale && ['en', 'es', 'gn'].includes(locale)) {
        config.headers['Accept-Language'] = locale
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - could trigger token refresh here
      // For now, just reject to let the calling code handle it
      if (typeof window !== 'undefined') {
        // Could dispatch an event or call a refresh token function here
        window.dispatchEvent(new CustomEvent('auth:unauthorized'))
      }
    }
    return Promise.reject(error)
  }
)

// Setup comprehensive logging interceptors (only in development)
if (process.env.NODE_ENV === 'development') {
  setupInterceptors(AXIOS_INSTANCE)
}

// Custom instance function that Orval will use
export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  return AXIOS_INSTANCE.request<T>(config).then((response) => response.data)
}

// Export the axios instance if needed elsewhere
export default AXIOS_INSTANCE
