import { defineConfig } from 'orval'

export default defineConfig({
  voucherbookApi: {
    input: {
      target: 'http://localhost:5500/api/v1/docs/openapi/all-apis.json',
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
