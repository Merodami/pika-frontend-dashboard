/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SubscriptionCheckResponse = {
    description: `Subscription access check result`,
    properties: {
        hasAccess: {
            type: 'boolean',
            isRequired: true,
        },
        subscription: {
            properties: {
                id: {
                    type: 'string',
                    description: `Universally Unique Identifier`,
                    isRequired: true,
                    format: 'uuid',
                },
                planId: {
                    type: 'string',
                    description: `Universally Unique Identifier`,
                    isRequired: true,
                    format: 'uuid',
                },
                planName: {
                    type: 'string',
                    isRequired: true,
                },
                status: {
                    type: 'string',
                    isRequired: true,
                },
                features: {
                    type: 'array',
                    contains: {
                        type: 'string',
                    },
                    isRequired: true,
                },
            },
        },
        reason: {
            type: 'string',
        },
    },
} as const;
