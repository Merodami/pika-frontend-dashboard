/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GetUserSubscriptionsRequest = {
    description: `Get user subscriptions`,
    properties: {
        userId: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        includeInactive: {
            type: 'boolean',
        },
    },
} as const;
