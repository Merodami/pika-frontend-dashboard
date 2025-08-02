/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AdminBusinessQueryParams = {
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
        userId: {
            type: 'string',
            description: `Filter by owner`,
            format: 'uuid',
        },
        categoryId: {
            type: 'string',
            description: `Filter by category`,
            format: 'uuid',
        },
        status: {
            type: 'Enum',
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
        maxRating: {
            type: 'number',
            description: `Maximum rating filter`,
            maximum: 5,
        },
        includeDeleted: {
            type: 'boolean',
            description: `Include soft deleted businesses`,
        },
        createdFrom: {
            type: 'string',
            description: `Created date from`,
            format: 'date-time',
        },
        createdTo: {
            type: 'string',
            description: `Created date to`,
            format: 'date-time',
        },
        updatedFrom: {
            type: 'string',
            description: `Updated date from`,
            format: 'date-time',
        },
        updatedTo: {
            type: 'string',
            description: `Updated date to`,
            format: 'date-time',
        },
        include: {
            type: 'string',
            description: `Comma-separated relations: user,category`,
        },
    },
} as const;
