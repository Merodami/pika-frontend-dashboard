/**
 * Simple logger for development
 * Avoids complex configurations that cause serialization issues
 */

// Simple logger that just uses console
export const logger = {
  info: (...args: any[]) => console.log(...args),
  error: (...args: any[]) => console.error(...args),
  warn: (...args: any[]) => console.warn(...args),
  debug: (...args: any[]) => console.log(...args),
  child: () => logger, // Return itself for child loggers
}

export const createLogger = (name: string) => {
  return {
    info: (...args: any[]) => console.log(`[${name}]`, ...args),
    error: (...args: any[]) => console.error(`[${name}]`, ...args),
    warn: (...args: any[]) => console.warn(`[${name}]`, ...args),
    debug: (...args: any[]) => console.log(`[${name}]`, ...args),
  }
}

// Simple correlation ID generator
export const generateCorrelationId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
}

// Helper to extract correlation ID from headers
export const getCorrelationId = (headers: Headers | Record<string, string>): string => {
  let correlationId: string | null = null
  
  if (headers instanceof Headers) {
    correlationId = headers.get('x-correlation-id') || headers.get('x-request-id')
  } else {
    correlationId = headers['x-correlation-id'] || headers['x-request-id']
  }
  
  return correlationId || generateCorrelationId()
}