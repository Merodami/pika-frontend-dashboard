/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UpdateVoucherRequest = {
    description: `Update voucher information and translations`,
    properties: {
        title: {
            type: 'dictionary',
            contains: {
                type: 'string',
            },
        },
        description: {
            type: 'dictionary',
            contains: {
                type: 'string',
            },
        },
        termsAndConditions: {
            type: 'dictionary',
            contains: {
                type: 'string',
            },
        },
        discountType: {
            type: 'Enum',
        },
        discountValue: {
            type: 'number',
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
            format: 'date-time',
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
        metadata: {
            type: 'any',
            isNullable: true,
        },
    },
} as const;
