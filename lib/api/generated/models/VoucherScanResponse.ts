/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Voucher scan tracking result
 */
export type VoucherScanResponse = {
    /**
     * Public voucher information
     */
    voucher: {
        /**
         * Universally Unique Identifier
         */
        id: string;
        /**
         * Universally Unique Identifier
         */
        businessId: string;
        /**
         * Universally Unique Identifier
         */
        categoryId: string;
        /**
         * Current state of the voucher lifecycle
         */
        state: 'draft' | 'published' | 'claimed' | 'redeemed' | 'expired' | 'suspended';
        /**
         * Multilingual voucher title
         */
        title?: any;
        /**
         * Multilingual voucher description
         */
        description?: any;
        /**
         * Multilingual voucher terms
         */
        terms?: any;
        /**
         * Type of discount the voucher provides
         */
        discountType: 'percentage' | 'fixed';
        discountValue: number;
        currency?: string;
        /**
         * GeoJSON Point or Polygon
         */
        location?: any;
        imageUrl?: string | null;
        validFrom: string;
        expiresAt: string;
        maxRedemptions?: number | null;
        maxRedemptionsPerUser?: number;
        currentRedemptions?: number;
        metadata?: any | null;
        codes?: Array<{
            /**
             * Universally Unique Identifier
             */
            id: string;
            code: string;
            /**
             * Type of voucher code
             */
            type: 'qr' | 'short' | 'static';
            isActive: boolean;
            metadata?: Record<string, any>;
        }>;
        /**
         * When the record was created
         */
        createdAt: string;
        /**
         * When the record was last updated
         */
        updatedAt: string;
    };
    /**
     * Universally Unique Identifier
     */
    scanId: string;
    canClaim: boolean;
    alreadyClaimed: boolean;
    nearbyLocations?: Array<{
        name: string;
        address: string;
        distance: number;
        coordinates: {
            latitude: number;
            longitude: number;
        };
    }>;
};

