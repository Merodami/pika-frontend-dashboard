/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GetBusinessesByCategoryRequest = {
    description: `Query parameters for getting businesses in a specific category`,
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
            type: 'string',
            description: `Field to sort by`,
        },
        sortOrder: {
            type: 'Enum',
        },
        search: {
            type: 'string',
            description: `Search query`,
        },
        onlyActive: {
            type: 'boolean',
        },
        onlyVerified: {
            type: 'boolean',
        },
        include: {
            type: 'string',
            description: `Comma-separated relations: user,category`,
        },
    },
} as const;
