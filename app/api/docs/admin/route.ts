import { ApiReference } from '@scalar/nextjs-api-reference'

// Admin API is only available in non-production environments
const isProduction = process.env.NODE_ENV === 'production'

const apiUrl = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/api/v1/docs/admin-api.json`

const config = {
  url: apiUrl,
}

const scalarHandler = ApiReference(config)

export const GET = isProduction 
  ? () => {
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/api/docs/public',
        },
      })
    }
  : scalarHandler