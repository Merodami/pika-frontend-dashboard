/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CancelSubscriptionRequest = {
    description: `Cancel a subscription`,
    properties: {
        cancelAtPeriodEnd: {
            type: 'boolean',
            description: `Whether to cancel at period end`,
        },
        reason: {
            type: 'string',
            description: `Cancellation reason`,
        },
        feedback: {
            type: 'string',
            description: `User feedback`,
        },
    },
} as const;
