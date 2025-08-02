/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UpdateSubscriptionPlanRequest = {
    description: `Update a subscription plan`,
    properties: {
        name: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
        price: {
            type: 'number',
        },
        trialPeriodDays: {
            type: 'number',
        },
        features: {
            type: 'array',
            contains: {
                type: 'string',
            },
        },
        isActive: {
            type: 'boolean',
        },
        metadata: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
        },
        stripePriceId: {
            type: 'string',
        },
    },
} as const;
