/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AdminTransactionQueryParams = {
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
        fromDate: {
            type: 'string',
            description: `Start date (ISO 8601)`,
            format: 'date-time',
        },
        toDate: {
            type: 'string',
            description: `End date (ISO 8601)`,
            format: 'date-time',
        },
        type: {
            type: 'Enum',
        },
        status: {
            type: 'Enum',
        },
        paymentMethod: {
            type: 'Enum',
        },
        userId: {
            type: 'string',
            format: 'uuid',
        },
        businessId: {
            type: 'string',
            description: `Universally Unique Identifier`,
            format: 'uuid',
        },
        stripePaymentIntentId: {
            type: 'string',
        },
        minAmount: {
            type: 'number',
        },
        maxAmount: {
            type: 'number',
        },
        currency: {
            type: 'string',
            maxLength: 3,
            minLength: 3,
        },
        hasDispute: {
            type: 'boolean',
        },
    },
} as const;
