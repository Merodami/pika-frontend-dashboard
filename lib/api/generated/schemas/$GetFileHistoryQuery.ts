/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GetFileHistoryQuery = {
    description: `Query parameters for file history`,
    properties: {
        status: {
            type: 'string',
        },
        folder: {
            type: 'string',
        },
        contentType: {
            type: 'string',
        },
        provider: {
            type: 'string',
        },
        fromDate: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        toDate: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        page: {
            type: 'number',
        },
        limit: {
            type: 'number',
            maximum: 100,
        },
        sortBy: {
            type: 'Enum',
        },
        sortOrder: {
            type: 'Enum',
        },
    },
} as const;
