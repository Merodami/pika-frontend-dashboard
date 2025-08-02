/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BulkVoucherUpdateRequest = {
    description: `Update multiple vouchers at once`,
    properties: {
        voucherIds: {
            type: 'array',
            contains: {
                type: 'string',
                description: `Universally Unique Identifier`,
                format: 'uuid',
            },
            isRequired: true,
        },
        updates: {
            properties: {
                state: {
                    type: 'Enum',
                },
                expiresAt: {
                    type: 'string',
                    description: `ISO 8601 datetime with timezone`,
                    format: 'date-time',
                },
                maxRedemptions: {
                    type: 'number',
                    isNullable: true,
                },
                maxRedemptionsPerUser: {
                    type: 'number',
                },
            },
            isRequired: true,
        },
        reason: {
            type: 'string',
            isRequired: true,
            maxLength: 500,
        },
    },
} as const;
