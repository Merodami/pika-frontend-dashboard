/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $VoucherAnalyticsResponse = {
    description: `Voucher analytics data`,
    properties: {
        voucherId: {
            type: 'string',
            description: `Universally Unique Identifier`,
            isRequired: true,
            format: 'uuid',
        },
        period: {
            properties: {
                start: {
                    type: 'string',
                    description: `ISO 8601 datetime with timezone`,
                    isRequired: true,
                    format: 'date-time',
                },
                end: {
                    type: 'string',
                    description: `ISO 8601 datetime with timezone`,
                    isRequired: true,
                    format: 'date-time',
                },
            },
            isRequired: true,
        },
        totalScans: {
            type: 'number',
            isRequired: true,
        },
        totalClaims: {
            type: 'number',
            isRequired: true,
        },
        totalRedemptions: {
            type: 'number',
            isRequired: true,
        },
        uniqueUsers: {
            type: 'number',
            isRequired: true,
        },
        redemptionRate: {
            type: 'number',
            isRequired: true,
            maximum: 1,
        },
        scansBySource: {
            type: 'dictionary',
            contains: {
                type: 'number',
            },
            isRequired: true,
        },
        scansByType: {
            type: 'dictionary',
            contains: {
                type: 'number',
            },
            isRequired: true,
        },
        dailyStats: {
            type: 'array',
            contains: {
                properties: {
                    date: {
                        type: 'string',
                        description: `ISO 8601 datetime with timezone`,
                        isRequired: true,
                        format: 'date-time',
                    },
                    scans: {
                        type: 'number',
                        isRequired: true,
                    },
                    claims: {
                        type: 'number',
                        isRequired: true,
                    },
                    redemptions: {
                        type: 'number',
                        isRequired: true,
                    },
                },
            },
            isRequired: true,
        },
    },
} as const;
