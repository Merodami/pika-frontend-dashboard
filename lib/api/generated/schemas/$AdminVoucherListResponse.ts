/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AdminVoucherListResponse = {
    description: `Paginated response`,
    properties: {
        data: {
            type: 'array',
            contains: {
                description: `Detailed voucher information for admin with industry-standard include relations`,
                properties: {
                    id: {
                        type: 'string',
                        description: `Universally Unique Identifier`,
                        isRequired: true,
                        format: 'uuid',
                    },
                    businessId: {
                        type: 'string',
                        description: `Universally Unique Identifier`,
                        isRequired: true,
                        format: 'uuid',
                    },
                    categoryId: {
                        type: 'string',
                        description: `Universally Unique Identifier`,
                        isRequired: true,
                        format: 'uuid',
                    },
                    state: {
                        type: 'Enum',
                        isRequired: true,
                    },
                    title: {
                        type: 'string',
                        description: `Voucher title in requested language`,
                        isRequired: true,
                    },
                    description: {
                        type: 'string',
                        description: `Voucher description in requested language`,
                        isRequired: true,
                    },
                    terms: {
                        type: 'string',
                        description: `Voucher terms and conditions in requested language`,
                        isRequired: true,
                    },
                    discountType: {
                        type: 'Enum',
                        isRequired: true,
                    },
                    discountValue: {
                        type: 'number',
                        description: `Decimal number with 2 decimal places`,
                        isRequired: true,
                    },
                    currency: {
                        type: 'string',
                    },
                    location: {
                        type: 'any',
                        description: `Geographic location as GeoJSON Point`,
                        isRequired: true,
                        isNullable: true,
                    },
                    imageUrl: {
                        type: 'string',
                        isRequired: true,
                        isNullable: true,
                        format: 'uri',
                    },
                    validFrom: {
                        type: 'string',
                        description: `ISO 8601 datetime with timezone`,
                        isRequired: true,
                        format: 'date-time',
                    },
                    expiresAt: {
                        type: 'string',
                        description: `ISO 8601 datetime with timezone`,
                        isRequired: true,
                        format: 'date-time',
                    },
                    maxRedemptions: {
                        type: 'number',
                        isRequired: true,
                        isNullable: true,
                    },
                    maxRedemptionsPerUser: {
                        type: 'number',
                    },
                    currentRedemptions: {
                        type: 'number',
                    },
                    scanCount: {
                        type: 'number',
                    },
                    claimCount: {
                        type: 'number',
                    },
                    metadata: {
                        type: 'any',
                        isRequired: true,
                        isNullable: true,
                    },
                    deletedAt: {
                        type: 'string',
                        description: `ISO 8601 datetime with timezone`,
                        isRequired: true,
                        isNullable: true,
                        format: 'date-time',
                    },
                    business: {
                        description: `Complete business object when ?include=business`,
                        properties: {
                            id: {
                                type: 'string',
                                description: `Universally Unique Identifier`,
                                isRequired: true,
                                format: 'uuid',
                            },
                            name: {
                                type: 'string',
                                isRequired: true,
                            },
                        },
                    },
                    category: {
                        description: `Complete category object when ?include=category`,
                        properties: {
                            id: {
                                type: 'string',
                                description: `Universally Unique Identifier`,
                                isRequired: true,
                                format: 'uuid',
                            },
                            name: {
                                type: 'string',
                                isRequired: true,
                            },
                        },
                    },
                    codes: {
                        type: 'array',
                        contains: {
                            properties: {
                                id: {
                                    type: 'string',
                                    description: `Universally Unique Identifier`,
                                    isRequired: true,
                                    format: 'uuid',
                                },
                                code: {
                                    type: 'string',
                                    isRequired: true,
                                    maxLength: 500,
                                },
                                type: {
                                    type: 'Enum',
                                    isRequired: true,
                                },
                                isActive: {
                                    type: 'boolean',
                                    isRequired: true,
                                },
                                metadata: {
                                    type: 'any',
                                    isRequired: true,
                                    isNullable: true,
                                },
                                createdAt: {
                                    type: 'string',
                                    description: `ISO 8601 datetime with timezone`,
                                    isRequired: true,
                                    format: 'date-time',
                                },
                                updatedAt: {
                                    type: 'string',
                                    description: `ISO 8601 datetime with timezone`,
                                    isRequired: true,
                                    format: 'date-time',
                                },
                            },
                        },
                    },
                    redemptions: {
                        type: 'array',
                        contains: {
                            properties: {
                                id: {
                                    type: 'string',
                                    description: `Universally Unique Identifier`,
                                    isRequired: true,
                                    format: 'uuid',
                                },
                                userId: {
                                    type: 'string',
                                    description: `Universally Unique Identifier`,
                                    isRequired: true,
                                    format: 'uuid',
                                },
                                codeUsed: {
                                    type: 'string',
                                    isRequired: true,
                                },
                                redeemedAt: {
                                    type: 'string',
                                    description: `ISO 8601 datetime with timezone`,
                                    isRequired: true,
                                    format: 'date-time',
                                },
                                metadata: {
                                    type: 'any',
                                    isRequired: true,
                                    isNullable: true,
                                },
                                createdAt: {
                                    type: 'string',
                                    description: `ISO 8601 datetime with timezone`,
                                    isRequired: true,
                                    format: 'date-time',
                                },
                            },
                        },
                    },
                    scans: {
                        type: 'array',
                        contains: {
                            properties: {
                                id: {
                                    type: 'string',
                                    description: `Universally Unique Identifier`,
                                    isRequired: true,
                                    format: 'uuid',
                                },
                                userId: {
                                    type: 'string',
                                    description: `Universally Unique Identifier`,
                                    isRequired: true,
                                    isNullable: true,
                                    format: 'uuid',
                                },
                                scanType: {
                                    type: 'Enum',
                                    isRequired: true,
                                },
                                scanSource: {
                                    type: 'Enum',
                                    isRequired: true,
                                },
                                location: {
                                    type: 'any',
                                    description: `Geographic location as GeoJSON Point`,
                                    isRequired: true,
                                    isNullable: true,
                                },
                                deviceInfo: {
                                    type: 'dictionary',
                                    contains: {
                                        properties: {
                                        },
                                    },
                                    isRequired: true,
                                },
                                scannedAt: {
                                    type: 'string',
                                    description: `ISO 8601 datetime with timezone`,
                                    isRequired: true,
                                    format: 'date-time',
                                },
                                createdAt: {
                                    type: 'string',
                                    description: `ISO 8601 datetime with timezone`,
                                    isRequired: true,
                                    format: 'date-time',
                                },
                            },
                        },
                    },
                    customerVouchers: {
                        type: 'array',
                        contains: {
                            properties: {
                                id: {
                                    type: 'string',
                                    description: `Universally Unique Identifier`,
                                    isRequired: true,
                                    format: 'uuid',
                                },
                                customerId: {
                                    type: 'string',
                                    description: `Universally Unique Identifier`,
                                    isRequired: true,
                                    format: 'uuid',
                                },
                                claimedAt: {
                                    type: 'string',
                                    description: `ISO 8601 datetime with timezone`,
                                    isRequired: true,
                                    format: 'date-time',
                                },
                                status: {
                                    type: 'Enum',
                                    isRequired: true,
                                },
                                notificationPreferences: {
                                    type: 'any',
                                    isRequired: true,
                                    isNullable: true,
                                },
                                redeemedAt: {
                                    type: 'string',
                                    description: `ISO 8601 datetime with timezone`,
                                    isRequired: true,
                                    isNullable: true,
                                    format: 'date-time',
                                },
                                createdAt: {
                                    type: 'string',
                                    description: `ISO 8601 datetime with timezone`,
                                    isRequired: true,
                                    format: 'date-time',
                                },
                                updatedAt: {
                                    type: 'string',
                                    description: `ISO 8601 datetime with timezone`,
                                    isRequired: true,
                                    format: 'date-time',
                                },
                            },
                        },
                    },
                    isActive: {
                        type: 'boolean',
                        isRequired: true,
                    },
                    isExpired: {
                        type: 'boolean',
                        isRequired: true,
                    },
                    redemptionRate: {
                        type: 'number',
                        isRequired: true,
                        maximum: 1,
                    },
                    daysUntilExpiry: {
                        type: 'number',
                        isRequired: true,
                        isNullable: true,
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
            },
            isRequired: true,
        },
        pagination: {
            description: `Pagination information`,
            properties: {
                page: {
                    type: 'number',
                    description: `Current page number`,
                    isRequired: true,
                },
                limit: {
                    type: 'number',
                    description: `Items per page`,
                    isRequired: true,
                    maximum: 100,
                },
                total: {
                    type: 'number',
                    description: `Total number of items`,
                    isRequired: true,
                },
                totalPages: {
                    type: 'number',
                    description: `Total number of pages`,
                    isRequired: true,
                },
                hasNext: {
                    type: 'boolean',
                    description: `Whether there is a next page`,
                    isRequired: true,
                },
                hasPrev: {
                    type: 'boolean',
                    description: `Whether there is a previous page`,
                    isRequired: true,
                },
            },
            isRequired: true,
        },
    },
} as const;
