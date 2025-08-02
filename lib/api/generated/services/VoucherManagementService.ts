/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class VoucherManagementService {
    /**
     * List all vouchers with admin details
     * @returns any List of vouchers
     * @throws ApiError
     */
    public static getAdminVoucherList({
        page = 1,
        limit = 20,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        search,
        businessId,
        categoryId,
        state,
        discountType,
        minDiscount,
        maxDiscount,
        currency,
        validFromStart,
        validFromEnd,
        expiresAtStart,
        expiresAtEnd,
        createdFromStart,
        createdFromEnd,
        minRedemptions,
        maxRedemptions,
        minScans,
        maxScans,
        isDeleted,
        include,
        latitude,
        longitude,
        radius,
        isActive,
        isExpired,
        hasLocation,
        hasImage,
    }: {
        /**
         * Page number
         */
        page?: number,
        /**
         * Items per page
         */
        limit?: number,
        /**
         * Admin voucher sort fields
         */
        sortBy?: 'createdAt' | 'updatedAt' | 'state' | 'discountValue' | 'currentRedemptions' | 'expiresAt' | 'businessId',
        /**
         * Sort order
         */
        sortOrder?: 'asc' | 'desc',
        /**
         * Search query
         */
        search?: string,
        /**
         * Universally Unique Identifier
         */
        businessId?: string,
        /**
         * Universally Unique Identifier
         */
        categoryId?: string,
        /**
         * Current state of the voucher lifecycle
         */
        state?: 'draft' | 'published' | 'claimed' | 'redeemed' | 'expired' | 'suspended',
        /**
         * Type of discount the voucher provides
         */
        discountType?: 'percentage' | 'fixed',
        minDiscount?: number,
        maxDiscount?: number,
        currency?: string,
        /**
         * ISO 8601 datetime with timezone
         */
        validFromStart?: string,
        /**
         * ISO 8601 datetime with timezone
         */
        validFromEnd?: string,
        /**
         * ISO 8601 datetime with timezone
         */
        expiresAtStart?: string,
        /**
         * ISO 8601 datetime with timezone
         */
        expiresAtEnd?: string,
        /**
         * ISO 8601 datetime with timezone
         */
        createdFromStart?: string,
        /**
         * ISO 8601 datetime with timezone
         */
        createdFromEnd?: string,
        minRedemptions?: number,
        maxRedemptions?: number,
        minScans?: number,
        maxScans?: number,
        isDeleted?: boolean,
        /**
         * Comma-separated relations: business,category,codes,redemptions,scans,customerVouchers,analytics,fraudCases
         */
        include?: string,
        /**
         * Latitude for geospatial search
         */
        latitude?: number,
        /**
         * Longitude for geospatial search
         */
        longitude?: number,
        /**
         * Search radius in meters
         */
        radius?: number,
        /**
         * Filter by active status
         */
        isActive?: boolean,
        /**
         * Filter by expired status
         */
        isExpired?: boolean,
        /**
         * Filter vouchers with location
         */
        hasLocation?: boolean,
        /**
         * Filter vouchers with image
         */
        hasImage?: boolean,
    }): CancelablePromise<{
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
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vouchers',
            query: {
                'page': page,
                'limit': limit,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
                'search': search,
                'businessId': businessId,
                'categoryId': categoryId,
                'state': state,
                'discountType': discountType,
                'minDiscount': minDiscount,
                'maxDiscount': maxDiscount,
                'currency': currency,
                'validFromStart': validFromStart,
                'validFromEnd': validFromEnd,
                'expiresAtStart': expiresAtStart,
                'expiresAtEnd': expiresAtEnd,
                'createdFromStart': createdFromStart,
                'createdFromEnd': createdFromEnd,
                'minRedemptions': minRedemptions,
                'maxRedemptions': maxRedemptions,
                'minScans': minScans,
                'maxScans': maxScans,
                'isDeleted': isDeleted,
                'include': include,
                'latitude': latitude,
                'longitude': longitude,
                'radius': radius,
                'isActive': isActive,
                'isExpired': isExpired,
                'hasLocation': hasLocation,
                'hasImage': hasImage,
            },
        });
    }
    /**
     * Create a new voucher
     * @returns any Voucher created successfully
     * @throws ApiError
     */
    public static createAdminVoucher({
        requestBody,
    }: {
        requestBody?: {
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
        },
    }): CancelablePromise<{
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
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vouchers',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid voucher data`,
            },
        });
    }
    /**
     * Get voucher details
     * @returns any Voucher details
     * @throws ApiError
     */
    public static getAdminVoucherById({
        id,
    }: {
        /**
         * Voucher ID
         */
        id: string,
    }): CancelablePromise<{
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
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vouchers/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Voucher not found`,
            },
        });
    }
    /**
     * Update voucher information
     * @returns any Voucher updated successfully
     * @throws ApiError
     */
    public static updateAdminVoucher({
        id,
        requestBody,
    }: {
        /**
         * Voucher ID
         */
        id: string,
        requestBody?: {
            /**
             * Title translations by language code
             */
            title?: Record<string, string>;
            /**
             * Description translations by language code
             */
            description?: Record<string, string>;
            /**
             * Terms and conditions translations by language code
             */
            termsAndConditions?: Record<string, string>;
            /**
             * Type of discount the voucher provides
             */
            discountType?: 'percentage' | 'fixed';
            discountValue?: number;
            currency?: string;
            /**
             * Geographic location as GeoJSON Point
             */
            location?: any | null;
            imageUrl?: string | null;
            /**
             * ISO 8601 datetime with timezone
             */
            validFrom?: string;
            /**
             * ISO 8601 datetime with timezone
             */
            expiresAt?: string;
            maxRedemptions?: number | null;
            maxRedemptionsPerUser?: number;
            metadata?: any | null;
        },
    }): CancelablePromise<{
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
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/vouchers/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Voucher not found`,
            },
        });
    }
    /**
     * Delete a voucher
     * @returns void
     * @throws ApiError
     */
    public static deleteAdminVoucher({
        id,
    }: {
        /**
         * Voucher ID
         */
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/vouchers/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Voucher not found`,
            },
        });
    }
    /**
     * Update multiple vouchers
     * @returns any Vouchers updated successfully
     * @throws ApiError
     */
    public static patchVouchersBulkUpdate({
        requestBody,
    }: {
        requestBody?: {
            voucherIds: Array<string>;
            updates: {
                /**
                 * Current state of the voucher lifecycle
                 */
                state?: 'draft' | 'published' | 'claimed' | 'redeemed' | 'expired' | 'suspended';
                /**
                 * ISO 8601 datetime with timezone
                 */
                expiresAt?: string;
                maxRedemptions?: number | null;
                maxRedemptionsPerUser?: number;
            };
            reason: string;
        },
    }): CancelablePromise<{
        /**
         * Number of successful operations
         */
        successful: number;
        /**
         * Number of failed operations
         */
        failed: number;
        /**
         * Details of failed operations
         */
        errors?: Array<{
            /**
             * Universally Unique Identifier
             */
            voucherId: string;
            error: string;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/vouchers/bulk-update',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request data`,
            },
        });
    }
    /**
     * Get voucher analytics
     * @returns any Voucher analytics data
     * @throws ApiError
     */
    public static getVouchersAnalytics({
        startDate,
        endDate,
        groupBy,
    }: {
        /**
         * ISO 8601 datetime with timezone
         */
        startDate?: string,
        /**
         * ISO 8601 datetime with timezone
         */
        endDate?: string,
        /**
         * Analytics grouping period
         */
        groupBy?: 'day' | 'week' | 'month',
    }): CancelablePromise<{
        /**
         * Universally Unique Identifier
         */
        voucherId: string;
        period: {
            /**
             * ISO 8601 datetime with timezone
             */
            start: string;
            /**
             * ISO 8601 datetime with timezone
             */
            end: string;
        };
        totalScans: number;
        totalClaims: number;
        totalRedemptions: number;
        uniqueUsers: number;
        redemptionRate: number;
        scansBySource: Record<string, number>;
        scansByType: Record<string, number>;
        dailyStats: Array<{
            /**
             * ISO 8601 datetime with timezone
             */
            date: string;
            scans: number;
            claims: number;
            redemptions: number;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vouchers/analytics',
            query: {
                'startDate': startDate,
                'endDate': endDate,
                'groupBy': groupBy,
            },
        });
    }
}
