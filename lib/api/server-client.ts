/**
 * Server-side API client
 * Uses server instance with direct API calls and cookie access
 */
import 'server-only'
import { serverInstance } from '../api/server-instance'

// Re-export all endpoints but using server instance
export const getUserProfile = () => {
  return serverInstance<any>({
    url: `/users/me`,
    method: 'GET',
  })
}

// Re-export models and types
export * from './orval-generated/models'
