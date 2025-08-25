import { ApiReference } from '@scalar/nextjs-api-reference'

const apiUrl = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/api/v1/docs/public-api.json`

const config = {
  url: apiUrl,
}

export const GET = ApiReference(config)