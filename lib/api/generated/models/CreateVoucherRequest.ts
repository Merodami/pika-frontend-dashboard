/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Create new voucher with translations
 */
export type CreateVoucherRequest = {
    /**
     * Universally Unique Identifier
     */
    businessId: string;
    /**
     * Universally Unique Identifier
     */
    categoryId: string;
    /**
     * Title translations by language code
     */
    title: Record<string, string>;
    /**
     * Description translations by language code
     */
    description: Record<string, string>;
    /**
     * Terms and conditions translations by language code
     */
    termsAndConditions: Record<string, string>;
    /**
     * Type of discount the voucher provides
     */
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    currency?: string;
    /**
     * Geographic location as GeoJSON Point
     */
    location?: any | null;
    imageUrl?: string | null;
    /**
     * ISO 8601 datetime with timezone
     */
    validFrom: string;
    /**
     * ISO 8601 datetime with timezone
     */
    expiresAt: string;
    maxRedemptions?: number | null;
    maxRedemptionsPerUser?: number;
    metadata?: any | null;
};

