/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PaginationMetadata = {
    description: `Pagination information`,
    properties: {
        page: {
            type: 'number',
            description: `Current page number`,
            isRequired: true,
        },
        limit: {
            type: 'number',
            description: `Items per page`,
            isRequired: true,
            maximum: 100,
        },
        total: {
            type: 'number',
            description: `Total number of items`,
            isRequired: true,
        },
        totalPages: {
            type: 'number',
            description: `Total number of pages`,
            isRequired: true,
        },
        hasNext: {
            type: 'boolean',
            description: `Whether there is a next page`,
            isRequired: true,
        },
        hasPrev: {
            type: 'boolean',
            description: `Whether there is a previous page`,
            isRequired: true,
        },
    },
} as const;
