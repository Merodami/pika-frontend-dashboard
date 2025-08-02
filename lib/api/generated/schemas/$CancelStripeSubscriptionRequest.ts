/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CancelStripeSubscriptionRequest = {
    description: `Cancel Stripe subscription`,
    properties: {
        stripeSubscriptionId: {
            type: 'string',
            isRequired: true,
        },
        cancelAtPeriodEnd: {
            type: 'boolean',
        },
        reason: {
            type: 'string',
        },
    },
} as const;
