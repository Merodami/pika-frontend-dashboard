/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AdminCategoryTreeResponse = {
    description: `Hierarchical category tree structure for admin`,
    properties: {
        categories: {
            type: 'array',
            contains: {
                type: 'AdminCategoryResponse',
            },
            isRequired: true,
        },
        totalCount: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;
