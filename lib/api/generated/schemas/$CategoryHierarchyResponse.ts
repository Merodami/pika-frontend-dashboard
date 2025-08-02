/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CategoryHierarchyResponse = {
    description: `Hierarchical category tree structure`,
    properties: {
        data: {
            type: 'array',
            contains: {
                type: 'all-of',
                contains: [{
                    type: 'CategoryResponse',
                }],
            },
            isRequired: true,
        },
    },
} as const;
