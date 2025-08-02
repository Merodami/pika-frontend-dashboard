/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AdminBulkFileActionRequest = {
    description: `Bulk action on multiple files`,
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
        action: {
            type: 'Enum',
            isRequired: true,
        },
        newStatus: {
            type: 'Enum',
        },
    },
} as const;
