/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Batch fetch vouchers response with pagination metadata
 */
export type GetVouchersByIdsResponse = {
    /**
     * Page items
     */
    data: Array<{
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
         * Voucher title in requested language
         */
        title: string;
        /**
         * Voucher description in requested language
         */
        description: string;
        /**
         * Voucher terms and conditions in requested language
         */
        terms: string;
        /**
         * Type of discount the voucher provides
         */
        discountType: 'percentage' | 'fixed';
        /**
         * Decimal number with 2 decimal places
         */
        discountValue: number;
        currency?: string;
        /**
         * Geographic location as GeoJSON Point
         */
        location: any | null;
        imageUrl: string | null;
        /**
         * ISO 8601 datetime with timezone
         */
        validFrom: string;
        /**
         * ISO 8601 datetime with timezone
         */
        expiresAt: string;
        maxRedemptions: number | null;
        maxRedemptionsPerUser?: number;
        currentRedemptions?: number;
        scanCount?: number;
        claimCount?: number;
        metadata: any | null;
        /**
         * ISO 8601 datetime with timezone
         */
        deletedAt: string | null;
        /**
         * Complete business object when ?include=business
         */
        business?: {
            /**
             * Universally Unique Identifier
             */
            id: string;
            name: string;
        };
        /**
         * Complete category object when ?include=category
         */
        category?: {
            /**
             * Universally Unique Identifier
             */
            id: string;
            name: string;
        };
        /**
         * Voucher codes when ?include=codes
         */
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
            metadata: any | null;
            /**
             * ISO 8601 datetime with timezone
             */
            createdAt: string;
            /**
             * ISO 8601 datetime with timezone
             */
            updatedAt: string;
        }>;
        /**
         * Redemption history when ?include=redemptions
         */
        redemptions?: Array<{
            /**
             * Universally Unique Identifier
             */
            id: string;
            /**
             * Universally Unique Identifier
             */
            userId: string;
            codeUsed: string;
            /**
             * ISO 8601 datetime with timezone
             */
            redeemedAt: string;
            metadata: any | null;
            /**
             * ISO 8601 datetime with timezone
             */
            createdAt: string;
        }>;
        /**
         * Scan analytics when ?include=scans
         */
        scans?: Array<{
            /**
             * Universally Unique Identifier
             */
            id: string;
            /**
             * Universally Unique Identifier
             */
            userId: string | null;
            /**
             * Type of voucher scan
             */
            scanType: 'customer' | 'business';
            /**
             * Source of the voucher scan
             */
            scanSource: 'camera' | 'gallery' | 'link' | 'share';
            /**
             * Geographic location as GeoJSON Point
             */
            location: any | null;
            deviceInfo: Record<string, any>;
            /**
             * ISO 8601 datetime with timezone
             */
            scannedAt: string;
            /**
             * ISO 8601 datetime with timezone
             */
            createdAt: string;
        }>;
        /**
         * Customer wallet entries when ?include=customerVouchers
         */
        customerVouchers?: Array<{
            /**
             * Universally Unique Identifier
             */
            id: string;
            /**
             * Universally Unique Identifier
             */
            customerId: string;
            /**
             * ISO 8601 datetime with timezone
             */
            claimedAt: string;
            /**
             * Status of voucher from customer perspective
             */
            status: 'claimed' | 'redeemed' | 'expired';
            notificationPreferences: any | null;
            /**
             * ISO 8601 datetime with timezone
             */
            redeemedAt: string | null;
            /**
             * ISO 8601 datetime with timezone
             */
            createdAt: string;
            /**
             * ISO 8601 datetime with timezone
             */
            updatedAt: string;
        }>;
        isActive: boolean;
        isExpired: boolean;
        redemptionRate: number;
        daysUntilExpiry: number | null;
        /**
         * When the record was created
         */
        createdAt: string;
        /**
         * When the record was last updated
         */
        updatedAt: string;
    }>;
    /**
     * Pagination information
     */
    pagination: {
        /**
         * Current page number
         */
        page: number;
        /**
         * Items per page
         */
        limit: number;
        /**
         * Total number of items
         */
        total: number;
        /**
         * Total number of pages
         */
        totalPages: number;
        /**
         * Whether there is a next page
         */
        hasNext: boolean;
        /**
         * Whether there is a previous page
         */
        hasPrev: boolean;
    };
    /**
     * IDs of vouchers that were not found
     */
    notFound: Array<string>;
};

