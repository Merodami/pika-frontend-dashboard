/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CleanupOrphanedFilesResponse = {
    description: `Cleanup orphaned files response`,
    properties: {
        filesFound: {
            type: 'number',
            isRequired: true,
        },
        filesDeleted: {
            type: 'number',
            isRequired: true,
        },
        storageFreed: {
            type: 'number',
            description: `Storage freed in bytes`,
            isRequired: true,
        },
        errors: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
        dryRun: {
            type: 'boolean',
            isRequired: true,
        },
    },
} as const;
