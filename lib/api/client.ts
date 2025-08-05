import { client, createConfig } from './generated-hey/client.gen'
import type { Config } from './generated-hey/client'
import { env } from '@/lib/env'
import { getAccessToken } from '@/app/services/tokenService'

// Create a configured client with proper base URL and interceptors
const createApiClient = () => {
  const config = createConfig({
    baseUrl: env.NEXT_PUBLIC_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Create client with the config
  const apiClient = client.withConfig(config)

  // Add request interceptor to include auth token
  apiClient.request.use(async (config) => {
    const token = await getAccessToken()
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }
    return config
  })

  // Add response interceptor for error handling
  apiClient.response.use(
    (response) => response,
    async (error) => {
      // Handle 401 errors by redirecting to login
      if (error.response?.status === 401) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      }
      return Promise.reject(error)
    }
  )

  return apiClient
}

// Export the configured client
export const api = createApiClient()

// Re-export all SDK functions for convenience
export * from './generated-hey/sdk.gen'
export type * from './generated-hey/types.gen'