/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserSubscriptionStatusResponse = {
    description: `User subscription status`,
    properties: {
        userId: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        hasActiveSubscription: {
            type: 'boolean',
            isRequired: true,
        },
        subscriptionType: {
            type: 'string',
        },
        expiresAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        creditsRemaining: {
            type: 'number',
            isRequired: true,
        },
        canBookSessions: {
            type: 'boolean',
            isRequired: true,
        },
    },
} as const;
