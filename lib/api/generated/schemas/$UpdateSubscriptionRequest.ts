/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UpdateSubscriptionRequest = {
    description: `Update a subscription`,
    properties: {
        planId: {
            type: 'string',
            description: `Universally Unique Identifier`,
            format: 'uuid',
        },
        status: {
            type: 'Enum',
        },
        currentPeriodStart: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        currentPeriodEnd: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        trialEnd: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        cancelAtPeriodEnd: {
            type: 'boolean',
        },
        cancelledAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        metadata: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
        },
    },
} as const;
