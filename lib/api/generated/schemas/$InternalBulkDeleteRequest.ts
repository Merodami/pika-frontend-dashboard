/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $InternalBulkDeleteRequest = {
    description: `Internal bulk delete files request`,
    properties: {
        fileIds: {
            type: 'array',
            contains: {
                type: 'string',
                description: `Universally Unique Identifier`,
                format: 'uuid',
            },
            isRequired: true,
        },
        userId: {
            type: 'string',
            description: `If provided, only delete files owned by this user`,
            format: 'uuid',
        },
        reason: {
            type: 'string',
        },
    },
} as const;
