/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PaymentStatsResponse = {
    description: `Financial summary for a period`,
    properties: {
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
        totalRevenue: {
            type: 'number',
            isRequired: true,
        },
        totalRefunds: {
            type: 'number',
            isRequired: true,
        },
        totalFees: {
            type: 'number',
            isRequired: true,
        },
        netRevenue: {
            type: 'number',
            isRequired: true,
        },
        revenueByType: {
            description: `Revenue by transaction type (all keys optional)`,
            properties: {
                payment: {
                    type: 'number',
                },
                refund: {
                    type: 'number',
                },
                transfer: {
                    type: 'number',
                },
                payout: {
                    type: 'number',
                },
                adjustment: {
                    type: 'number',
                },
            },
            isRequired: true,
        },
        revenueByPaymentMethod: {
            description: `Revenue by payment method (all keys optional)`,
            properties: {
                card: {
                    type: 'number',
                },
                bankTransfer: {
                    type: 'number',
                },
                wallet: {
                    type: 'number',
                },
                cash: {
                    type: 'number',
                },
            },
            isRequired: true,
        },
        transactionCount: {
            type: 'number',
            isRequired: true,
        },
        successfulCount: {
            type: 'number',
            isRequired: true,
        },
        failedCount: {
            type: 'number',
            isRequired: true,
        },
        disputeCount: {
            type: 'number',
            isRequired: true,
        },
        averageTransactionAmount: {
            type: 'number',
            isRequired: true,
        },
        topBusinesses: {
            type: 'array',
            contains: {
                properties: {
                    businessId: {
                        type: 'string',
                        description: `Universally Unique Identifier`,
                        isRequired: true,
                        format: 'uuid',
                    },
                    businessName: {
                        type: 'string',
                        isRequired: true,
                    },
                    revenue: {
                        type: 'number',
                        isRequired: true,
                    },
                    transactionCount: {
                        type: 'number',
                        isRequired: true,
                    },
                },
            },
        },
        topUsers: {
            type: 'array',
            contains: {
                properties: {
                    userId: {
                        type: 'string',
                        isRequired: true,
                        format: 'uuid',
                    },
                    userName: {
                        type: 'string',
                        isRequired: true,
                    },
                    spent: {
                        type: 'number',
                        isRequired: true,
                    },
                    transactionCount: {
                        type: 'number',
                        isRequired: true,
                    },
                },
            },
        },
    },
} as const;
