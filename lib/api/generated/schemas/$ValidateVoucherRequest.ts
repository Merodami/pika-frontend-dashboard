/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ValidateVoucherRequest = {
    description: `Validate voucher availability and constraints`,
    properties: {
        voucherId: {
            type: 'string',
            description: `Universally Unique Identifier`,
            isRequired: true,
            format: 'uuid',
        },
        userId: {
            type: 'string',
            description: `User ID for user-specific validation`,
            format: 'uuid',
        },
        checkRedemptionLimit: {
            type: 'boolean',
            description: `Check if redemption limit reached`,
        },
        checkExpiry: {
            type: 'boolean',
            description: `Check if voucher is expired`,
        },
        checkState: {
            type: 'boolean',
            description: `Check if voucher is in valid state`,
        },
    },
} as const;
