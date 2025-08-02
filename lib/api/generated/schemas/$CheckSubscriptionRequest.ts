/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CheckSubscriptionRequest = {
    description: `Check if user has subscription access`,
    properties: {
        userId: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        feature: {
            type: 'string',
        },
        requiredPlan: {
            type: 'string',
        },
    },
} as const;
