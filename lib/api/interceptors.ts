import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { apiDebugger } from './debug-helpers'

// Store for tracking request times
const requestTimings = new Map<string, number>()

/**
 * Generate a unique request ID
 */
const generateRequestId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Format headers for logging (hide sensitive data)
 */
const formatHeaders = (headers: any): any => {
  const sensitive = ['authorization', 'cookie', 'x-api-key', 'x-auth-token']
  const formatted: any = {}
  
  Object.keys(headers || {}).forEach(key => {
    const lowerKey = key.toLowerCase()
    formatted[key] = sensitive.includes(lowerKey) ? '[REDACTED]' : headers[key]
  })
  
  return formatted
}

/**
 * Format duration for display
 */
const formatDuration = (ms: number): string => {
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(2)}s`
}

/**
 * Setup request interceptor
 */
export const setupRequestInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const requestId = generateRequestId()
      
      // Add request ID to headers
      if (!config.headers) config.headers = {}
      config.headers['x-request-id'] = requestId
      
      // Store request start time
      requestTimings.set(requestId, Date.now())
      
      // Log request in development
      if (process.env.NODE_ENV === 'development') {
        const method = config.method?.toUpperCase() || 'GET'
        const url = config.url || ''
        const fullUrl = config.baseURL ? `${config.baseURL}${url}` : url
        
        // Create formatted log
        console.group(
          `%c🔄 API Request %c${method} %c${url}`,
          'color: #3b82f6; font-weight: bold;',
          'color: #facc15; font-weight: bold;',
          'color: #94a3b8;'
        )
        console.log('%cRequest ID:', 'color: #64748b;', requestId)
        console.log('%cFull URL:', 'color: #64748b;', fullUrl)
        
        if (config.params && Object.keys(config.params).length > 0) {
          console.log('%cQuery Params:', 'color: #64748b;', config.params)
        }
        
        console.log('%cHeaders:', 'color: #64748b;', formatHeaders(config.headers))
        
        if (config.data) {
          console.log('%cBody:', 'color: #64748b;', config.data)
        }
        
        console.groupEnd()
      }
      
      return config
    },
    (error: AxiosError) => {
      
      if (process.env.NODE_ENV === 'development') {
        console.error('%c❌ Request Error:', 'color: #ef4444; font-weight: bold;', error.message)
      }
      
      return Promise.reject(error)
    }
  )
}

/**
 * Setup response interceptor
 */
export const setupResponseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      const requestId = response.config.headers?.['x-request-id']
      const startTime = requestTimings.get(requestId)
      const duration = startTime ? Date.now() - startTime : 0
      
      // Clean up timing
      if (requestId) {
        requestTimings.delete(requestId)
      }
      
      // Add to debug helper
      apiDebugger.addLog({
        timestamp: new Date().toISOString(),
        method: response.config.method?.toUpperCase() || 'GET',
        url: response.config.url || '',
        status: response.status,
        duration: duration.toString(),
        correlationId: response.headers['x-correlation-id'] || requestId,
      })
      
      // Log response in development
      if (process.env.NODE_ENV === 'development') {
        const method = response.config.method?.toUpperCase() || 'GET'
        const url = response.config.url || ''
        const status = response.status
        const statusText = response.statusText
        
        // Determine status color
        let statusColor = '#10b981' // green for 2xx
        if (status >= 300 && status < 400) statusColor = '#3b82f6' // blue for 3xx
        else if (status >= 400 && status < 500) statusColor = '#f59e0b' // yellow for 4xx
        else if (status >= 500) statusColor = '#ef4444' // red for 5xx
        
        console.group(
          `%c✅ API Response %c${status} ${statusText} %c(${formatDuration(duration)})`,
          'color: #10b981; font-weight: bold;',
          `color: ${statusColor}; font-weight: bold;`,
          'color: #64748b;'
        )
        console.log('%cRequest ID:', 'color: #64748b;', requestId)
        console.log('%cMethod:', 'color: #64748b;', method)
        console.log('%cURL:', 'color: #64748b;', url)
        console.log('%cDuration:', 'color: #64748b;', formatDuration(duration))
        console.log('%cHeaders:', 'color: #64748b;', formatHeaders(response.headers))
        
        if (response.data) {
          console.log('%cData:', 'color: #64748b;', response.data)
        }
        
        console.groupEnd()
      }
      
      return response
    },
    (error: AxiosError) => {
      const requestId = error.config?.headers?.['x-request-id']
      const startTime = requestTimings.get(requestId)
      const duration = startTime ? Date.now() - startTime : 0
      
      // Clean up timing
      if (requestId) {
        requestTimings.delete(requestId)
      }
      
      // Add to debug helper
      apiDebugger.addLog({
        timestamp: new Date().toISOString(),
        method: error.config?.method?.toUpperCase() || 'GET',
        url: error.config?.url || '',
        status: error.response?.status,
        duration: duration.toString(),
        correlationId: error.response?.headers?.['x-correlation-id'] || requestId,
        error: error.message,
      })
      
      // Log error in development
      if (process.env.NODE_ENV === 'development') {
        const method = error.config?.method?.toUpperCase() || 'GET'
        const url = error.config?.url || ''
        const status = error.response?.status || 0
        const statusText = error.response?.statusText || error.message
        
        console.group(
          `%c❌ API Error %c${status || 'Network Error'} %c(${formatDuration(duration)})`,
          'color: #ef4444; font-weight: bold;',
          'color: #ef4444; font-weight: bold;',
          'color: #64748b;'
        )
        console.log('%cRequest ID:', 'color: #64748b;', requestId)
        console.log('%cMethod:', 'color: #64748b;', method)
        console.log('%cURL:', 'color: #64748b;', url)
        console.log('%cDuration:', 'color: #64748b;', formatDuration(duration))
        console.log('%cError:', 'color: #ef4444;', statusText)
        
        if (error.response?.data) {
          console.log('%cResponse Data:', 'color: #ef4444;', error.response.data)
        }
        
        if (error.response?.headers) {
          console.log('%cResponse Headers:', 'color: #64748b;', formatHeaders(error.response.headers))
        }
        
        console.groupEnd()
      }
      
      return Promise.reject(error)
    }
  )
}

/**
 * Setup all interceptors for an axios instance
 */
export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  setupRequestInterceptor(axiosInstance)
  setupResponseInterceptor(axiosInstance)
  
  // In development, also enable axios debug logging
  if (process.env.NODE_ENV === 'development') {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.localStorage) {
      // Enable axios debug logging via localStorage flag
      const debugEnabled = localStorage.getItem('DEBUG_API') === 'true'
      if (debugEnabled) {
        require('axios-debug-log')({
          request: (debug: any, config: AxiosRequestConfig) => {
            debug(`Request to ${config.url}`)
          },
          response: (debug: any, response: AxiosResponse) => {
            debug(`Response from ${response.config.url}`, response.status)
          },
          error: (debug: any, error: AxiosError) => {
            debug('Error', error.message)
          },
        })
      }
    }
  }
  
  return axiosInstance
}