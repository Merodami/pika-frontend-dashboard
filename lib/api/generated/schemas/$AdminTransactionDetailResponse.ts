/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AdminTransactionDetailResponse = {
    description: `Detailed transaction information for admin`,
    properties: {
        id: {
            type: 'string',
            description: `Universally Unique Identifier`,
            isRequired: true,
            format: 'uuid',
        },
        type: {
            type: 'Enum',
            isRequired: true,
        },
        status: {
            type: 'Enum',
            isRequired: true,
        },
        amount: {
            type: 'number',
            isRequired: true,
        },
        currency: {
            type: 'string',
            isRequired: true,
            maxLength: 3,
            minLength: 3,
        },
        fee: {
            type: 'number',
        },
        tax: {
            type: 'number',
        },
        netAmount: {
            type: 'number',
            isRequired: true,
        },
        userId: {
            type: 'string',
            format: 'uuid',
        },
        userName: {
            type: 'string',
        },
        businessId: {
            type: 'string',
            description: `Universally Unique Identifier`,
            format: 'uuid',
        },
        businessName: {
            type: 'string',
        },
        paymentMethod: {
            type: 'Enum',
            isRequired: true,
        },
        stripePaymentIntentId: {
            type: 'string',
        },
        stripeChargeId: {
            type: 'string',
        },
        stripeRefundId: {
            type: 'string',
        },
        referenceType: {
            type: 'string',
            description: `Type of related entity`,
        },
        referenceId: {
            type: 'string',
            description: `ID of related entity`,
        },
        description: {
            type: 'string',
        },
        processedAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        failureReason: {
            type: 'string',
        },
        failureCode: {
            type: 'string',
        },
        disputeStatus: {
            type: 'Enum',
        },
        disputeReason: {
            type: 'string',
        },
        refundReason: {
            type: 'string',
        },
        refundedAmount: {
            type: 'number',
        },
        metadata: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
        },
        ipAddress: {
            type: 'string',
        },
        userAgent: {
            type: 'string',
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
