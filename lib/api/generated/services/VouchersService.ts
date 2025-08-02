/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class VouchersService {
    /**
     * Scan a voucher
     * @returns any Voucher scan result
     * @throws ApiError
     */
    public static scanVoucher({
        id,
        requestBody,
    }: {
        /**
         * Voucher ID
         */
        id: string,
        requestBody?: {
            /**
             * Source of the voucher scan
             */
            scanSource?: 'camera' | 'gallery' | 'link' | 'share';
            location?: {
                latitude: number;
                longitude: number;
            };
            deviceInfo?: {
                platform: string;
                version: string;
                model?: string;
            };
        },
    }): CancelablePromise<{
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
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vouchers/{id}/scan',
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
     * Claim a voucher
     * @returns any Voucher claimed successfully
     * @throws ApiError
     */
    public static claimVoucher({
        id,
        requestBody,
    }: {
        /**
         * Voucher ID
         */
        id: string,
        requestBody?: {
            notificationPreferences?: {
                enableReminders?: boolean;
                reminderDaysBefore?: number;
            };
        },
    }): CancelablePromise<{
        /**
         * Universally Unique Identifier
         */
        claimId: string;
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
        claimedAt: string;
        expiresAt: string | null;
        walletPosition: number;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vouchers/{id}/claim',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Cannot claim voucher`,
                404: `Voucher not found`,
            },
        });
    }
    /**
     * Redeem a voucher
     * @returns any Voucher redeemed successfully
     * @throws ApiError
     */
    public static redeemVoucher({
        id,
        requestBody,
    }: {
        /**
         * Voucher ID
         */
        id: string,
        requestBody?: {
            code: string;
            /**
             * GeoJSON location data
             */
            location?: any;
        },
    }): CancelablePromise<{
        message: string;
        /**
         * Universally Unique Identifier
         */
        voucherId: string;
        redeemedAt: string;
        discountApplied: number;
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
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vouchers/{id}/redeem',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Cannot redeem voucher`,
                404: `Voucher not found`,
            },
        });
    }
    /**
     * Get user claimed vouchers
     * @returns any User vouchers
     * @throws ApiError
     */
    public static getUserVouchers(): CancelablePromise<{
        /**
         * Page items
         */
        data: Array<{
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
            claimedAt: string;
            /**
             * Status of voucher from customer perspective
             */
            status: 'claimed' | 'redeemed' | 'expired';
            redeemedAt?: string | null;
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
            url: '/users/vouchers',
        });
    }
}
