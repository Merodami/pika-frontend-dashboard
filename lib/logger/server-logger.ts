/**
 * Server-side logger for Next.js API routes
 * Uses console.log in development for simplicity and avoids worker thread issues
 */

export interface ApiLogContext {
  correlationId: string
  userId?: string
  sessionId?: string
  traceId?: string
  spanId?: string
}

export interface ApiRequestLog {
  method: string
  url: string
  path: string
  query?: Record<string, any>
  headers?: Record<string, string>
  body?: any
  context?: ApiLogContext
}

export interface ApiResponseLog {
  statusCode: number
  duration: number
  headers?: Record<string, string>
  body?: any
  error?: any
}

export class ApiLogger {
  private context: ApiLogContext
  private startTime: number
  private isDevelopment: boolean

  constructor(context: ApiLogContext) {
    this.context = context
    this.startTime = Date.now()
    this.isDevelopment = process.env.NODE_ENV === 'development'
  }

  logRequest(request: ApiRequestLog): void {
    if (!this.isDevelopment) return

    const sanitizedHeaders = this.sanitizeHeaders(request.headers)

    console.log(
      `🔄 [${this.context.correlationId}] → ${request.method} ${request.path}`,
      {
        query: request.query,
        headers: sanitizedHeaders,
        body: this.sanitizeBody(request.body),
      }
    )
  }

  logResponse(response: ApiResponseLog): void {
    if (!this.isDevelopment) return

    const duration = response.duration || Date.now() - this.startTime
    const emoji =
      response.statusCode < 400 ? '✅' : response.statusCode < 500 ? '⚠️' : '❌'

    console.log(
      `${emoji} [${this.context.correlationId}] ← ${response.statusCode} (${duration}ms)`,
      {
        headers: this.sanitizeHeaders(response.headers),
        body: this.sanitizeBody(response.body),
      }
    )
  }

  logError(error: any, request?: ApiRequestLog): void {
    if (!this.isDevelopment) return

    const duration = Date.now() - this.startTime

    console.error(
      `❌ [${this.context.correlationId}] Error (${duration}ms):`,
      error.message,
      {
        stack: error.stack,
        request: request
          ? {
              method: request.method,
              url: request.url,
              path: request.path,
            }
          : undefined,
      }
    )
  }

  private sanitizeHeaders(
    headers?: Record<string, string>
  ): Record<string, string> | undefined {
    if (!headers) return undefined

    const sensitive = ['authorization', 'cookie', 'x-api-key', 'x-auth-token']
    const sanitized: Record<string, string> = {}

    Object.entries(headers).forEach(([key, value]) => {
      const lowerKey = key.toLowerCase()
      if (sensitive.includes(lowerKey)) {
        sanitized[key] = '[REDACTED]'
      } else {
        sanitized[key] = value
      }
    })

    return sanitized
  }

  private sanitizeBody(body?: any): any {
    if (!body) return undefined

    try {
      // Deep clone to avoid mutating original
      const cloned = JSON.parse(JSON.stringify(body))

      // List of sensitive field names to redact
      const sensitiveFields = [
        'password',
        'token',
        'secret',
        'apiKey',
        'creditCard',
      ]

      const sanitize = (obj: any): any => {
        if (typeof obj !== 'object' || obj === null) return obj

        Object.keys(obj).forEach((key) => {
          if (
            sensitiveFields.some((field) =>
              key.toLowerCase().includes(field.toLowerCase())
            )
          ) {
            obj[key] = '[REDACTED]'
          } else if (typeof obj[key] === 'object') {
            sanitize(obj[key])
          }
        })

        return obj
      }

      return sanitize(cloned)
    } catch {
      return body
    }
  }
}

// Correlation ID generator
export const generateCorrelationId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
}

// Helper to extract correlation ID from headers
export const getCorrelationId = (
  headers: Headers | Record<string, string>
): string => {
  let correlationId: string | null = null

  if (headers instanceof Headers) {
    correlationId =
      headers.get('x-correlation-id') || headers.get('x-request-id')
  } else {
    correlationId = headers['x-correlation-id'] || headers['x-request-id']
  }

  return correlationId || generateCorrelationId()
}
