/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ValidateCategoryResponse = {
    description: `Validation results for categories`,
    properties: {
        valid: {
            type: 'boolean',
            description: `Whether all categories are valid`,
            isRequired: true,
        },
        results: {
            type: 'array',
            contains: {
                properties: {
                    categoryId: {
                        type: 'string',
                        description: `Universally Unique Identifier`,
                        isRequired: true,
                        format: 'uuid',
                    },
                    exists: {
                        type: 'boolean',
                        isRequired: true,
                    },
                    isActive: {
                        type: 'boolean',
                        isRequired: true,
                    },
                    valid: {
                        type: 'boolean',
                        isRequired: true,
                    },
                },
            },
            isRequired: true,
        },
    },
} as const;
