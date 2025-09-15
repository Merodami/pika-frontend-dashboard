import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { ApiLogger, getCorrelationId } from '@/lib/logger/server-logger'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  'http://localhost:5500/api/v1'

// Proxy all API requests through Next.js
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleRequest(request, await params, 'GET')
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleRequest(request, await params, 'POST')
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleRequest(request, await params, 'PUT')
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleRequest(request, await params, 'PATCH')
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleRequest(request, await params, 'DELETE')
}

async function handleRequest(
  request: NextRequest,
  params: { path: string[] },
  method: string
) {
  const cookieStore = cookies()
  const accessToken = (await cookieStore).get('pika-access-token')?.value

  // Get or create correlation ID
  const correlationId = getCorrelationId(
    Object.fromEntries(request.headers.entries())
  )

  // Create logger for this request
  const logger = new ApiLogger({
    correlationId,
    userId: request.headers.get('x-user-id') || undefined,
    sessionId: request.headers.get('x-session-id') || undefined,
  })

  // Construct the backend URL
  const path = params.path.join('/')
  // API_BASE_URL already includes /api/v1, so we just append the path
  // Remove any leading slashes from path to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  const url = new URL(`${API_BASE_URL}/${cleanPath}`)

  // Copy query parameters
  request.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.append(key, value)
  })

  // Prepare headers
  const headers = new Headers({
    'Content-Type': 'application/json',
    'x-correlation-id': correlationId,
    'x-forwarded-for': request.headers.get('x-forwarded-for') || 'unknown',
    'x-real-ip': request.headers.get('x-real-ip') || 'unknown',
  })

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`)
  }

  // Prepare request options
  const options: RequestInit = {
    method,
    headers,
  }

  // Add body for non-GET requests
  let requestBody: any = undefined
  if (method !== 'GET' && request.body) {
    const bodyText = await request.text()
    options.body = bodyText
    try {
      requestBody = JSON.parse(bodyText)
    } catch {
      requestBody = bodyText
    }
  }

  // Log the outgoing request to backend
  logger.logRequest({
    method,
    url: url.toString(),
    path: `/${cleanPath}`,
    query: Object.fromEntries(url.searchParams.entries()),
    headers: Object.fromEntries(headers.entries()),
    body: requestBody,
  })

  const startTime = Date.now()

  try {
    const response = await fetch(url.toString(), options)
    const duration = Date.now() - startTime

    // Handle token refresh if needed
    if (response.status === 401) {
      // Implement token refresh logic here
      // For now, just pass through
    }

    // Handle 204 No Content specially (NextResponse doesn't support 204)
    if (response.status === 204) {
      // Log the backend response
      logger.logResponse({
        statusCode: response.status,
        duration,
        headers: Object.fromEntries(response.headers.entries()),
        body: null,
      })

      return new Response(null, {
        status: 204,
        headers: {
          'x-correlation-id': correlationId,
          'x-response-time': `${duration}ms`,
        },
      })
    }

    // Get response data for non-204 responses
    const data = await response.text()
    let responseBody: any = undefined
    try {
      responseBody = JSON.parse(data)
    } catch {
      responseBody = data
    }

    // Log the backend response
    logger.logResponse({
      statusCode: response.status,
      duration,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseBody,
    })

    // Return the response with correlation ID
    const nextResponse = new NextResponse(data, {
      status: response.status,
      headers: {
        'Content-Type':
          response.headers.get('Content-Type') || 'application/json',
        'x-correlation-id': correlationId,
        'x-response-time': `${duration}ms`,
      },
    })

    return nextResponse
  } catch (error) {
    const duration = Date.now() - startTime

    // Log the error
    logger.logError(error, {
      method,
      url: url.toString(),
      path: `/${cleanPath}`,
      query: Object.fromEntries(url.searchParams.entries()),
      headers: Object.fromEntries(headers.entries()),
      body: requestBody,
    })

    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Unknown error',
        correlationId,
      },
      {
        status: 500,
        headers: {
          'x-correlation-id': correlationId,
          'x-response-time': `${duration}ms`,
        },
      }
    )
  }
}
