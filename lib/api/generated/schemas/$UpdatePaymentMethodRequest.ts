/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UpdatePaymentMethodRequest = {
    description: `Update payment method`,
    properties: {
        isDefault: {
            type: 'boolean',
        },
        billingAddress: {
            properties: {
                line1: {
                    type: 'string',
                },
                line2: {
                    type: 'string',
                },
                city: {
                    type: 'string',
                },
                state: {
                    type: 'string',
                },
                postalCode: {
                    type: 'string',
                },
                country: {
                    type: 'string',
                    maxLength: 2,
                    minLength: 2,
                },
            },
        },
    },
} as const;
