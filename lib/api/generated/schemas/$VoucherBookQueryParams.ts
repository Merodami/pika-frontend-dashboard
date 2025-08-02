/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $VoucherBookQueryParams = {
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
            description: `Search in title and edition`,
        },
        bookType: {
            type: 'Enum',
        },
        year: {
            type: 'number',
            description: `Filter by year`,
            maximum: 2100,
            minimum: 2020,
        },
        month: {
            type: 'number',
            description: `Filter by month`,
            maximum: 12,
            minimum: 1,
        },
    },
} as const;
