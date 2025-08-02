/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateVoucherRequest = {
    description: `Create new voucher with translations`,
    properties: {
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
        title: {
            type: 'dictionary',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
        description: {
            type: 'dictionary',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
        termsAndConditions: {
            type: 'dictionary',
            contains: {
                type: 'string',
            },
            isRequired: true,
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
            type: 'any',
            description: `Geographic location as GeoJSON Point`,
            isNullable: true,
        },
        imageUrl: {
            type: 'string',
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
            isNullable: true,
        },
        maxRedemptionsPerUser: {
            type: 'number',
        },
        metadata: {
            type: 'any',
            isNullable: true,
        },
    },
} as const;
