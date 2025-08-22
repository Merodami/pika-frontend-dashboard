import 'server-only'
import axios, { AxiosRequestConfig } from 'axios'
import { cookies } from 'next/headers'

// Create axios instance for server-side usage
const AXIOS_SERVER = axios.create({
  baseURL:
    process.env.API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    'http://localhost:5500/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for server-side auth
AXIOS_SERVER.interceptors.request.use(
  async (config) => {
    try {
      const cookieStore = await cookies()
      const token = cookieStore.get('pika-access-token')?.value
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch (e) {
      // Not in a request context where cookies are available
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for handling auth errors
AXIOS_SERVER.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If we get a 401, clear cookies and redirect to login
    if (error.response?.status === 401) {
      const { redirect } = await import('next/navigation')
      const cookieStore = await cookies()
      
      // Clear auth cookies
      cookieStore.delete('pika-access-token')
      cookieStore.delete('pika-refresh-token')
      
      // Redirect to login
      redirect('/login')
    }
    
    return Promise.reject(error)
  }
)

// Custom instance function for server-side Orval
export const serverInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  return AXIOS_SERVER.request<T>(config).then((response) => response.data)
}

export default AXIOS_SERVER
