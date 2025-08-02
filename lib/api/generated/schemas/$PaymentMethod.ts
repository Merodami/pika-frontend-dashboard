/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PaymentMethod = {
    description: `User payment method`,
    properties: {
        id: {
            type: 'string',
            description: `Universally Unique Identifier`,
            isRequired: true,
            format: 'uuid',
        },
        userId: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        stripePaymentMethodId: {
            type: 'string',
            isRequired: true,
        },
        type: {
            type: 'Enum',
            isRequired: true,
        },
        isDefault: {
            type: 'boolean',
        },
        card: {
            properties: {
                brand: {
                    type: 'Enum',
                    isRequired: true,
                },
                last4: {
                    type: 'string',
                    isRequired: true,
                    maxLength: 4,
                    minLength: 4,
                },
                expMonth: {
                    type: 'number',
                    isRequired: true,
                    maximum: 12,
                    minimum: 1,
                },
                expYear: {
                    type: 'number',
                    isRequired: true,
                    minimum: 2025,
                },
                holderName: {
                    type: 'string',
                },
                country: {
                    type: 'string',
                    maxLength: 2,
                    minLength: 2,
                },
                funding: {
                    type: 'Enum',
                },
            },
        },
        bankAccount: {
            properties: {
                bankName: {
                    type: 'string',
                },
                last4: {
                    type: 'string',
                    isRequired: true,
                    maxLength: 4,
                    minLength: 4,
                },
                accountHolderName: {
                    type: 'string',
                    isRequired: true,
                },
                accountHolderType: {
                    type: 'Enum',
                    isRequired: true,
                },
                country: {
                    type: 'string',
                    isRequired: true,
                    maxLength: 2,
                    minLength: 2,
                },
                currency: {
                    type: 'string',
                    isRequired: true,
                    maxLength: 3,
                    minLength: 3,
                },
            },
        },
        wallet: {
            properties: {
                type: {
                    type: 'Enum',
                    isRequired: true,
                },
                dynamicLast4: {
                    type: 'string',
                    maxLength: 4,
                    minLength: 4,
                },
            },
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
        metadata: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
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
    },
} as const;
