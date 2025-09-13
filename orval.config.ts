import { defineConfig } from 'orval'

export default defineConfig({
  voucherbookApi: {
    input: {
      target: '../pika-backend/packages/api/generated/openapi/all-apis.json',
    },
    output: {
      mode: 'split',
      target: './lib/api/orval-generated/endpoints.ts',
      schemas: './lib/api/orval-generated/models',
      client: 'axios-functions',
      mock: false,
      prettier: true,
      override: {
        mutator: {
          path: './lib/api/orval-generated/custom-instance.ts',
          name: 'customInstance',
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
})
