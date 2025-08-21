import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export type MiddlewareHandler = (
  request: NextRequest,
  response?: NextResponse
) => Promise<NextResponse> | NextResponse

/**
 * Compose multiple middleware handlers into a single handler
 * Handlers are executed in order, each receiving the response from the previous
 *
 * @example
 * compose(
 *   withAuth,
 *   withRateLimit,
 *   withLogging
 * )(request)
 */
export function compose(...handlers: MiddlewareHandler[]) {
  return async (request: NextRequest): Promise<NextResponse> => {
    let response: NextResponse = NextResponse.next()

    for (const handler of handlers) {
      response = await handler(request, response)

      // If a handler returns a redirect or error response, stop the chain
      if (response.status >= 300 && response.status < 400) {
        return response // Redirect
      }

      if (response.status >= 400) {
        return response // Error
      }
    }

    return response
  }
}
