/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateSubscriptionPlanRequest = {
    description: `Create a new subscription plan`,
    properties: {
        name: {
            type: 'string',
            isRequired: true,
        },
        description: {
            type: 'string',
        },
        price: {
            type: 'number',
            isRequired: true,
        },
        currency: {
            type: 'string',
            maxLength: 3,
            minLength: 3,
        },
        interval: {
            type: 'Enum',
            isRequired: true,
        },
        intervalCount: {
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
            isRequired: true,
        },
        metadata: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
        },
        stripeProductId: {
            type: 'string',
        },
        stripePriceId: {
            type: 'string',
        },
    },
} as const;
