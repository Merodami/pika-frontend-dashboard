/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AdminVoucherQueryParams = {
    /**
     * Page number
     */
    page?: number;
    /**
     * Items per page
     */
    limit?: number;
    /**
     * Admin voucher sort fields
     */
    sortBy?: 'createdAt' | 'updatedAt' | 'state' | 'discountValue' | 'currentRedemptions' | 'expiresAt' | 'businessId';
    /**
     * Sort order
     */
    sortOrder?: 'asc' | 'desc';
    /**
     * Search query
     */
    search?: string;
    /**
     * Universally Unique Identifier
     */
    businessId?: string;
    /**
     * Universally Unique Identifier
     */
    categoryId?: string;
    /**
     * Current state of the voucher lifecycle
     */
    state?: 'draft' | 'published' | 'claimed' | 'redeemed' | 'expired' | 'suspended';
    /**
     * Type of discount the voucher provides
     */
    discountType?: 'percentage' | 'fixed';
    minDiscount?: number;
    maxDiscount?: number;
    currency?: string;
    /**
     * ISO 8601 datetime with timezone
     */
    validFromStart?: string;
    /**
     * ISO 8601 datetime with timezone
     */
    validFromEnd?: string;
    /**
     * ISO 8601 datetime with timezone
     */
    expiresAtStart?: string;
    /**
     * ISO 8601 datetime with timezone
     */
    expiresAtEnd?: string;
    /**
     * ISO 8601 datetime with timezone
     */
    createdFromStart?: string;
    /**
     * ISO 8601 datetime with timezone
     */
    createdFromEnd?: string;
    minRedemptions?: number;
    maxRedemptions?: number;
    minScans?: number;
    maxScans?: number;
    isDeleted?: boolean;
    /**
     * Comma-separated relations: business,category,codes,redemptions,scans,customerVouchers,analytics,fraudCases
     */
    include?: string;
    /**
     * Latitude for geospatial search
     */
    latitude?: number;
    /**
     * Longitude for geospatial search
     */
    longitude?: number;
    /**
     * Search radius in meters
     */
    radius?: number;
    /**
     * Filter by active status
     */
    isActive?: boolean;
    /**
     * Filter by expired status
     */
    isExpired?: boolean;
    /**
     * Filter vouchers with location
     */
    hasLocation?: boolean;
    /**
     * Filter vouchers with image
     */
    hasImage?: boolean;
};

