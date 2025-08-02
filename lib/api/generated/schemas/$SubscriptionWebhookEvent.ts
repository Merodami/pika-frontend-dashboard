/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SubscriptionWebhookEvent = {
    description: `Process subscription webhook event`,
    properties: {
        event: {
            properties: {
                type: {
                    type: 'Enum',
                    isRequired: true,
                },
                data: {
                    properties: {
                        object: {
                            properties: {
                            },
                        },
                    },
                    isRequired: true,
                },
                created: {
                    type: 'number',
                    isRequired: true,
                },
            },
            isRequired: true,
        },
        stripeSignature: {
            type: 'string',
        },
    },
} as const;
