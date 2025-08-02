/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SubscriptionPlan = {
    description: `Subscription plan details`,
    properties: {
        id: {
            type: 'string',
            description: `Universally Unique Identifier`,
            isRequired: true,
            format: 'uuid',
        },
        name: {
            type: 'string',
            description: `Name of the subscription plan`,
            isRequired: true,
        },
        description: {
            type: 'string',
            description: `Description of the subscription plan`,
        },
        price: {
            type: 'number',
            description: `Price per billing period`,
            isRequired: true,
        },
        currency: {
            type: 'string',
            description: `Currency code (e.g., usd, gbp)`,
            maxLength: 3,
            minLength: 3,
        },
        interval: {
            type: 'Enum',
            isRequired: true,
        },
        intervalCount: {
            type: 'number',
            description: `Number of intervals between billings`,
        },
        trialPeriodDays: {
            type: 'number',
            description: `Number of trial days`,
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
            description: `Stripe product ID`,
        },
        stripePriceId: {
            type: 'string',
            description: `Stripe price ID`,
        },
        createdAt: {
            type: 'string',
            description: `When the record was created`,
            isRequired: true,
            format: 'date-time',
        },
        updatedAt: {
            type: 'string',
            description: `When the record was last updated`,
            isRequired: true,
            format: 'date-time',
        },
        isActive: {
            type: 'boolean',
            description: `Whether the record is active`,
        },
    },
} as const;
