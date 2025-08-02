/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AdminBulkFileActionResponse = {
    description: `Bulk file action results`,
    properties: {
        successful: {
            type: 'array',
            contains: {
                type: 'string',
                description: `Universally Unique Identifier`,
                format: 'uuid',
            },
            isRequired: true,
        },
        failed: {
            type: 'array',
            contains: {
                properties: {
                    fileId: {
                        type: 'string',
                        description: `Universally Unique Identifier`,
                        isRequired: true,
                        format: 'uuid',
                    },
                    error: {
                        type: 'string',
                        isRequired: true,
                    },
                },
            },
            isRequired: true,
        },
        totalProcessed: {
            type: 'number',
            isRequired: true,
        },
        totalSuccessful: {
            type: 'number',
            isRequired: true,
        },
        totalFailed: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;
