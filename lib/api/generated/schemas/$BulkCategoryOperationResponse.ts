/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BulkCategoryOperationResponse = {
    description: `Bulk category operation result`,
    properties: {
        successful: {
            type: 'number',
            isRequired: true,
        },
        failed: {
            type: 'number',
            isRequired: true,
        },
        errors: {
            type: 'array',
            contains: {
                properties: {
                    categoryId: {
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
        },
    },
} as const;
