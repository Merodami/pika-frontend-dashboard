/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AddPaymentMethodRequest = {
    description: `Add a payment method`,
    properties: {
        stripePaymentMethodId: {
            type: 'string',
            isRequired: true,
        },
        makeDefault: {
            type: 'boolean',
        },
        billingAddress: {
            properties: {
                line1: {
                    type: 'string',
                    isRequired: true,
                },
                line2: {
                    type: 'string',
                },
                city: {
                    type: 'string',
                    isRequired: true,
                },
                state: {
                    type: 'string',
                    isRequired: true,
                },
                postalCode: {
                    type: 'string',
                    isRequired: true,
                },
                country: {
                    type: 'string',
                    isRequired: true,
                    maxLength: 2,
                    minLength: 2,
                },
            },
        },
    },
} as const;
