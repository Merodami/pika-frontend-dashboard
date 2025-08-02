/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $InternalBulkDeleteResponse = {
    description: `Internal bulk delete response`,
    properties: {
        deleted: {
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
        totalDeleted: {
            type: 'number',
            isRequired: true,
        },
        totalFailed: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;
