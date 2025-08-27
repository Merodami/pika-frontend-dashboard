import { ApiReference } from '@scalar/nextjs-api-reference'

// Determine API URL based on environment
const getApiUrl = () => {
  // Use the correct production API
  if (
    process.env.VERCEL_ENV === 'production' ||
    process.env.NODE_ENV === 'production'
  ) {
    return 'https://dev.api.thevoucherbook.com/api/v1/docs/admin-api.json'
  }
  // Fallback to environment variable or localhost
  const baseUrl =
    process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://localhost:5500'
  return `${baseUrl}/api/v1/docs/admin-api.json`
}

const config = {
  url: getApiUrl(),
}

// Create the handler
const handler = ApiReference(config)

// Export the handler directly as GET
export const GET = handler
