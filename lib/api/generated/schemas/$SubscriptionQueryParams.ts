/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SubscriptionQueryParams = {
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
        status: {
            type: 'Enum',
        },
        userId: {
            type: 'string',
            format: 'uuid',
        },
        planId: {
            type: 'string',
            description: `Universally Unique Identifier`,
            format: 'uuid',
        },
        cancelAtPeriodEnd: {
            type: 'boolean',
        },
    },
} as const;
