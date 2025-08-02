/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $VoucherQueryParams = {
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
            description: `Filter by business ID`,
            format: 'uuid',
        },
        categoryId: {
            type: 'string',
            description: `Filter by category ID`,
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
            description: `Minimum discount value`,
        },
        maxDiscount: {
            type: 'number',
            description: `Maximum discount value`,
        },
        minValue: {
            type: 'number',
            description: `Minimum voucher value`,
        },
        maxValue: {
            type: 'number',
            description: `Maximum voucher value`,
        },
        type: {
            type: 'string',
            description: `Voucher type filter`,
        },
        currency: {
            type: 'string',
            description: `Filter by currency`,
        },
        validFrom: {
            type: 'string',
            description: `Valid from date filter`,
            format: 'date-time',
        },
        validUntil: {
            type: 'string',
            description: `Valid until date filter`,
            format: 'date-time',
        },
        include: {
            type: 'string',
            description: `Comma-separated relations to include`,
        },
        hasAvailableUses: {
            type: 'boolean',
            description: `Filter vouchers with available uses`,
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
