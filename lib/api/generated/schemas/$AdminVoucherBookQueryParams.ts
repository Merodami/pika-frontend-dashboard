/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AdminVoucherBookQueryParams = {
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
        bookType: {
            type: 'Enum',
        },
        status: {
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
        createdBy: {
            type: 'string',
            description: `Filter by creator`,
            format: 'uuid',
        },
        updatedBy: {
            type: 'string',
            description: `Filter by last updater`,
            format: 'uuid',
        },
        hasContent: {
            type: 'boolean',
            description: `Filter books with/without content`,
        },
        hasPdf: {
            type: 'boolean',
            description: `Filter books with/without generated PDF`,
        },
    },
} as const;
