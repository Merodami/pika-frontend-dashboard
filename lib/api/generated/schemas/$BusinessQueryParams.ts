/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BusinessQueryParams = {
    properties: {
        page: {
            type: 'number',
            description: `Page number`,
        },
        limit: {
            type: 'number',
            description: `Items per page`,
            maximum: 100,
        },
        sortBy: {
            type: 'Enum',
        },
        sortOrder: {
            type: 'Enum',
        },
        search: {
            type: 'string',
            description: `Search query`,
        },
        categoryId: {
            type: 'string',
            description: `Filter by category`,
            format: 'uuid',
        },
        verified: {
            type: 'boolean',
            description: `Filter by verification status`,
        },
        active: {
            type: 'boolean',
            description: `Filter by active status`,
        },
        minRating: {
            type: 'number',
            description: `Minimum rating filter`,
            maximum: 5,
        },
    },
} as const;
