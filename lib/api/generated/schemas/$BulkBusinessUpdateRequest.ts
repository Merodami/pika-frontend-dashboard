/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BulkBusinessUpdateRequest = {
    description: `Update multiple businesses at once`,
    properties: {
        businessIds: {
            type: 'array',
            contains: {
                type: 'string',
                description: `Universally Unique Identifier`,
                format: 'uuid',
            },
            isRequired: true,
        },
        updates: {
            properties: {
                active: {
                    type: 'boolean',
                },
                verified: {
                    type: 'boolean',
                },
                categoryId: {
                    type: 'string',
                    description: `Universally Unique Identifier`,
                    format: 'uuid',
                },
            },
            isRequired: true,
        },
    },
} as const;
