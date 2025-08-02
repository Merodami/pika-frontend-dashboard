/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CleanupOrphanedFilesRequest = {
    description: `Cleanup orphaned files request`,
    properties: {
        olderThan: {
            type: 'string',
            description: `Delete files older than this date`,
            isRequired: true,
            format: 'date-time',
        },
        dryRun: {
            type: 'boolean',
        },
        provider: {
            type: 'Enum',
        },
        batchSize: {
            type: 'number',
            maximum: 1000,
        },
    },
} as const;
