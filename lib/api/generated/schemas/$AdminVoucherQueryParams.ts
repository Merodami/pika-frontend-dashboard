/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AdminVoucherQueryParams = {
    properties: {
        page: {
            type: 'number',
            description: `Page number`,
        },
        limit: {
            type: 'number',
            description: `Items per page`,
            maximum: 100,
        },
        sortBy: {
            type: 'Enum',
        },
        sortOrder: {
            type: 'Enum',
        },
        search: {
            type: 'string',
            description: `Search query`,
        },
        businessId: {
            type: 'string',
            description: `Universally Unique Identifier`,
            format: 'uuid',
        },
        categoryId: {
            type: 'string',
            description: `Universally Unique Identifier`,
            format: 'uuid',
        },
        state: {
            type: 'Enum',
        },
        discountType: {
            type: 'Enum',
        },
        minDiscount: {
            type: 'number',
        },
        maxDiscount: {
            type: 'number',
        },
        currency: {
            type: 'string',
        },
        validFromStart: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        validFromEnd: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        expiresAtStart: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        expiresAtEnd: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        createdFromStart: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        createdFromEnd: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        minRedemptions: {
            type: 'number',
        },
        maxRedemptions: {
            type: 'number',
        },
        minScans: {
            type: 'number',
        },
        maxScans: {
            type: 'number',
        },
        isDeleted: {
            type: 'boolean',
        },
        include: {
            type: 'string',
            description: `Comma-separated relations: business,category,codes,redemptions,scans,customerVouchers,analytics,fraudCases`,
        },
        latitude: {
            type: 'number',
            description: `Latitude for geospatial search`,
            maximum: 90,
            minimum: -90,
        },
        longitude: {
            type: 'number',
            description: `Longitude for geospatial search`,
            maximum: 180,
            minimum: -180,
        },
        radius: {
            type: 'number',
            description: `Search radius in meters`,
            maximum: 50000,
        },
        isActive: {
            type: 'boolean',
            description: `Filter by active status`,
        },
        isExpired: {
            type: 'boolean',
            description: `Filter by expired status`,
        },
        hasLocation: {
            type: 'boolean',
            description: `Filter vouchers with location`,
        },
        hasImage: {
            type: 'boolean',
            description: `Filter vouchers with image`,
        },
    },
} as const;
