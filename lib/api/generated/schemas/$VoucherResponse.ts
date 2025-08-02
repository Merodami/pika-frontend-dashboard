/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $VoucherResponse = {
    description: `Public voucher information`,
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
            description: `Multilingual voucher title`,
            properties: {
            },
        },
        description: {
            description: `Multilingual voucher description`,
            properties: {
            },
        },
        terms: {
            description: `Multilingual voucher terms`,
            properties: {
            },
        },
        discountType: {
            type: 'Enum',
            isRequired: true,
        },
        discountValue: {
            type: 'number',
            isRequired: true,
        },
        currency: {
            type: 'string',
        },
        location: {
            description: `GeoJSON Point or Polygon`,
            properties: {
            },
        },
        imageUrl: {
            type: 'string',
            isNullable: true,
            format: 'uri',
        },
        validFrom: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        expiresAt: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        maxRedemptions: {
            type: 'number',
            isNullable: true,
            minimum: 1,
        },
        maxRedemptionsPerUser: {
            type: 'number',
            minimum: 1,
        },
        currentRedemptions: {
            type: 'number',
        },
        metadata: {
            type: 'any',
            isNullable: true,
        },
        codes: {
            type: 'array',
            contains: {
                description: `Voucher code information`,
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
                        type: 'dictionary',
                        contains: {
                            properties: {
                            },
                        },
                    },
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
