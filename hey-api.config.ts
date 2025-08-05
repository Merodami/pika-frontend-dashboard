import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  client: 'axios',
  input: 'http://localhost:5500/api/v1/openapi.json',
  output: './lib/api/generated-hey',
  plugins: [
    '@hey-api/schemas',
    '@hey-api/services',
    '@hey-api/types',
    {
      name: '@hey-api/transformers',
      dates: true,
    },
  ],
})