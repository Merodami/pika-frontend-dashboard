import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  client: '@hey-api/client-axios',
  input: 'http://localhost:5500/api/v1/docs/openapi/all-apis.json',
  output: './lib/api/generated-hey',
})
