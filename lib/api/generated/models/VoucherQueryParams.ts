/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type VoucherQueryParams = {
    /**
     * Page number
     */
    page?: number;
    /**
     * Items per page
     */
    limit?: number;
    /**
     * Field to sort vouchers by
     */
    sortBy?: 'createdAt' | 'updatedAt' | 'expiresAt' | 'discountValue' | 'title';
    /**
     * Sort order
     */
    sortOrder?: 'asc' | 'desc';
    /**
     * Search query
     */
    search?: string;
    /**
     * Filter by business ID
     */
    businessId?: string;
    /**
     * Filter by category ID
     */
    categoryId?: string;
    /**
     * Filter by voucher state
     */
    state?: 'draft' | 'published' | 'claimed' | 'redeemed' | 'expired' | 'suspended';
    /**
     * Filter by discount type
     */
    discountType?: 'percentage' | 'fixed';
    /**
     * Minimum discount value
     */
    minDiscount?: number;
    /**
     * Maximum discount value
     */
    maxDiscount?: number;
    /**
     * Minimum voucher value
     */
    minValue?: number;
    /**
     * Maximum voucher value
     */
    maxValue?: number;
    /**
     * Voucher type filter
     */
    type?: string;
    /**
     * Filter by currency
     */
    currency?: string;
    /**
     * Valid from date filter
     */
    validFrom?: string;
    /**
     * Valid until date filter
     */
    validUntil?: string;
    /**
     * Comma-separated relations to include
     */
    include?: string;
    /**
     * Filter vouchers with available uses
     */
    hasAvailableUses?: boolean;
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

