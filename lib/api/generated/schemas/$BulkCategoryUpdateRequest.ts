/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BulkCategoryUpdateRequest = {
    description: `Update multiple categories at once`,
    properties: {
        categoryIds: {
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
                isActive: {
                    type: 'boolean',
                },
                parentId: {
                    type: 'string',
                    description: `Universally Unique Identifier`,
                    format: 'uuid',
                },
            },
            isRequired: true,
        },
    },
} as const;
