/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoryResponse } from '../models/CategoryResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BusinessManagementService {
    /**
     * List all businesses with admin details
     * @returns any List of businesses
     * @throws ApiError
     */
    public static getAdminBusinessList({
        page = 1,
        limit = 20,
        sortBy = 'businessName',
        sortOrder = 'desc',
        search,
        userId,
        categoryId,
        status,
        verified,
        active,
        minRating,
        maxRating,
        includeDeleted,
        createdFrom,
        createdTo,
        updatedFrom,
        updatedTo,
        include,
    }: {
        /**
         * Page number
         */
        page?: number,
        /**
         * Items per page
         */
        limit?: number,
        sortBy?: 'businessName' | 'avgRating' | 'verified' | 'active' | 'createdAt' | 'updatedAt',
        /**
         * Sort order
         */
        sortOrder?: 'asc' | 'desc',
        /**
         * Search query
         */
        search?: string,
        /**
         * Filter by owner
         */
        userId?: string,
        /**
         * Filter by category
         */
        categoryId?: string,
        /**
         * Filter by status
         */
        status?: 'all' | 'active' | 'inactive' | 'verified' | 'unverified',
        /**
         * Filter by verification status
         */
        verified?: boolean,
        /**
         * Filter by active status
         */
        active?: boolean,
        /**
         * Minimum rating filter
         */
        minRating?: number,
        /**
         * Maximum rating filter
         */
        maxRating?: number,
        /**
         * Include soft deleted businesses
         */
        includeDeleted?: boolean,
        /**
         * Created date from
         */
        createdFrom?: string,
        /**
         * Created date to
         */
        createdTo?: string,
        /**
         * Updated date from
         */
        updatedFrom?: string,
        /**
         * Updated date to
         */
        updatedTo?: string,
        /**
         * Comma-separated relations: user,category
         */
        include?: string,
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
             * User who owns this business
             */
            userId: string;
            /**
             * Translation key for business name
             */
            businessNameKey: string;
            /**
             * Translation key for business description
             */
            businessDescriptionKey?: string;
            /**
             * Category this business belongs to
             */
            categoryId: string;
            /**
             * Whether business is verified
             */
            verified?: boolean;
            /**
             * Whether business is active
             */
            active?: boolean;
            /**
             * Average rating of the business
             */
            avgRating?: number;
            /**
             * Soft deletion timestamp
             */
            deletedAt: string | null;
            /**
             * Business owner details when ?include=user
             */
            user?: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
                phoneNumber?: string;
                /**
                 * Date in YYYY-MM-DD format
                 */
                dateOfBirth?: string;
                avatarUrl?: string;
                /**
                 * User account status
                 */
                status: 'active' | 'suspended' | 'banned' | 'unconfirmed';
                /**
                 * User role in the system
                 */
                role: 'admin' | 'customer' | 'business';
                emailVerified: boolean;
                phoneVerified: boolean;
                /**
                 * ISO 8601 datetime with timezone
                 */
                lastLoginAt?: string;
                /**
                 * When the record was created
                 */
                createdAt: string;
                /**
                 * When the record was last updated
                 */
                updatedAt: string;
            };
            category?: CategoryResponse;
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
            url: '/admin/businesses',
            query: {
                'page': page,
                'limit': limit,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
                'search': search,
                'userId': userId,
                'categoryId': categoryId,
                'status': status,
                'verified': verified,
                'active': active,
                'minRating': minRating,
                'maxRating': maxRating,
                'includeDeleted': includeDeleted,
                'createdFrom': createdFrom,
                'createdTo': createdTo,
                'updatedFrom': updatedFrom,
                'updatedTo': updatedTo,
                'include': include,
            },
        });
    }
    /**
     * Create a new business
     * @returns any Business created successfully
     * @throws ApiError
     */
    public static createAdminBusiness({
        requestBody,
    }: {
        requestBody?: {
            /**
             * User who will own this business
             */
            userId: string;
            /**
             * Business name
             */
            businessName: string;
            /**
             * Business description
             */
            businessDescription?: string;
            /**
             * Category this business belongs to
             */
            categoryId: string;
            /**
             * Whether business is verified
             */
            verified?: boolean;
            /**
             * Whether business is active
             */
            active?: boolean;
        },
    }): CancelablePromise<{
        /**
         * Universally Unique Identifier
         */
        id: string;
        /**
         * User who owns this business
         */
        userId: string;
        /**
         * Translation key for business name
         */
        businessNameKey: string;
        /**
         * Translation key for business description
         */
        businessDescriptionKey?: string;
        /**
         * Category this business belongs to
         */
        categoryId: string;
        /**
         * Whether business is verified
         */
        verified?: boolean;
        /**
         * Whether business is active
         */
        active?: boolean;
        /**
         * Average rating of the business
         */
        avgRating?: number;
        /**
         * Soft deletion timestamp
         */
        deletedAt: string | null;
        /**
         * Business owner details when ?include=user
         */
        user?: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            phoneNumber?: string;
            /**
             * Date in YYYY-MM-DD format
             */
            dateOfBirth?: string;
            avatarUrl?: string;
            /**
             * User account status
             */
            status: 'active' | 'suspended' | 'banned' | 'unconfirmed';
            /**
             * User role in the system
             */
            role: 'admin' | 'customer' | 'business';
            emailVerified: boolean;
            phoneVerified: boolean;
            /**
             * ISO 8601 datetime with timezone
             */
            lastLoginAt?: string;
            /**
             * When the record was created
             */
            createdAt: string;
            /**
             * When the record was last updated
             */
            updatedAt: string;
        };
        category?: CategoryResponse;
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
            url: '/admin/businesses',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get business details
     * @returns any Business details
     * @throws ApiError
     */
    public static getAdminBusinessById({
        id,
    }: {
        /**
         * Universally Unique Identifier
         */
        id: string,
    }): CancelablePromise<{
        /**
         * Universally Unique Identifier
         */
        id: string;
        /**
         * User who owns this business
         */
        userId: string;
        /**
         * Translation key for business name
         */
        businessNameKey: string;
        /**
         * Translation key for business description
         */
        businessDescriptionKey?: string;
        /**
         * Category this business belongs to
         */
        categoryId: string;
        /**
         * Whether business is verified
         */
        verified?: boolean;
        /**
         * Whether business is active
         */
        active?: boolean;
        /**
         * Average rating of the business
         */
        avgRating?: number;
        /**
         * Soft deletion timestamp
         */
        deletedAt: string | null;
        /**
         * Business owner details when ?include=user
         */
        user?: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            phoneNumber?: string;
            /**
             * Date in YYYY-MM-DD format
             */
            dateOfBirth?: string;
            avatarUrl?: string;
            /**
             * User account status
             */
            status: 'active' | 'suspended' | 'banned' | 'unconfirmed';
            /**
             * User role in the system
             */
            role: 'admin' | 'customer' | 'business';
            emailVerified: boolean;
            phoneVerified: boolean;
            /**
             * ISO 8601 datetime with timezone
             */
            lastLoginAt?: string;
            /**
             * When the record was created
             */
            createdAt: string;
            /**
             * When the record was last updated
             */
            updatedAt: string;
        };
        category?: CategoryResponse;
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
            url: '/admin/businesses/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update business information
     * @returns any Business updated successfully
     * @throws ApiError
     */
    public static updateAdminBusiness({
        id,
        requestBody,
    }: {
        /**
         * Universally Unique Identifier
         */
        id: string,
        requestBody?: {
            /**
             * Business name
             */
            businessName?: string;
            /**
             * Business description
             */
            businessDescription?: string;
            /**
             * Category this business belongs to
             */
            categoryId?: string;
            /**
             * Whether business is verified
             */
            verified?: boolean;
            /**
             * Whether business is active
             */
            active?: boolean;
        },
    }): CancelablePromise<{
        /**
         * Universally Unique Identifier
         */
        id: string;
        /**
         * User who owns this business
         */
        userId: string;
        /**
         * Translation key for business name
         */
        businessNameKey: string;
        /**
         * Translation key for business description
         */
        businessDescriptionKey?: string;
        /**
         * Category this business belongs to
         */
        categoryId: string;
        /**
         * Whether business is verified
         */
        verified?: boolean;
        /**
         * Whether business is active
         */
        active?: boolean;
        /**
         * Average rating of the business
         */
        avgRating?: number;
        /**
         * Soft deletion timestamp
         */
        deletedAt: string | null;
        /**
         * Business owner details when ?include=user
         */
        user?: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            phoneNumber?: string;
            /**
             * Date in YYYY-MM-DD format
             */
            dateOfBirth?: string;
            avatarUrl?: string;
            /**
             * User account status
             */
            status: 'active' | 'suspended' | 'banned' | 'unconfirmed';
            /**
             * User role in the system
             */
            role: 'admin' | 'customer' | 'business';
            emailVerified: boolean;
            phoneVerified: boolean;
            /**
             * ISO 8601 datetime with timezone
             */
            lastLoginAt?: string;
            /**
             * When the record was created
             */
            createdAt: string;
            /**
             * When the record was last updated
             */
            updatedAt: string;
        };
        category?: CategoryResponse;
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
            url: '/admin/businesses/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete business
     * @returns void
     * @throws ApiError
     */
    public static deleteAdminBusiness({
        id,
    }: {
        /**
         * Universally Unique Identifier
         */
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/businesses/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update business verification status
     * @returns void
     * @throws ApiError
     */
    public static updateAdminBusinessVerification({
        id,
        requestBody,
    }: {
        /**
         * Universally Unique Identifier
         */
        id: string,
        requestBody?: {
            /**
             * New verification status
             */
            verified: boolean;
        },
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/admin/businesses/{id}/verification',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Activate a business
     * @returns void
     * @throws ApiError
     */
    public static activateAdminBusiness({
        id,
    }: {
        /**
         * Universally Unique Identifier
         */
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/businesses/{id}/activate',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Deactivate a business
     * @returns void
     * @throws ApiError
     */
    public static deactivateAdminBusiness({
        id,
    }: {
        /**
         * Universally Unique Identifier
         */
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/businesses/{id}/deactivate',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update business rating
     * @returns any Business rating updated
     * @throws ApiError
     */
    public static updateAdminBusinessRating({
        id,
        requestBody,
    }: {
        /**
         * Universally Unique Identifier
         */
        id: string,
        requestBody?: {
            /**
             * New rating value for the business
             */
            rating: number;
        },
    }): CancelablePromise<{
        /**
         * Universally Unique Identifier
         */
        id: string;
        /**
         * User who owns this business
         */
        userId: string;
        /**
         * Translation key for business name
         */
        businessNameKey: string;
        /**
         * Translation key for business description
         */
        businessDescriptionKey?: string;
        /**
         * Category this business belongs to
         */
        categoryId: string;
        /**
         * Whether business is verified
         */
        verified?: boolean;
        /**
         * Whether business is active
         */
        active?: boolean;
        /**
         * Average rating of the business
         */
        avgRating?: number;
        /**
         * Soft deletion timestamp
         */
        deletedAt: string | null;
        /**
         * Business owner details when ?include=user
         */
        user?: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            phoneNumber?: string;
            /**
             * Date in YYYY-MM-DD format
             */
            dateOfBirth?: string;
            avatarUrl?: string;
            /**
             * User account status
             */
            status: 'active' | 'suspended' | 'banned' | 'unconfirmed';
            /**
             * User role in the system
             */
            role: 'admin' | 'customer' | 'business';
            emailVerified: boolean;
            phoneVerified: boolean;
            /**
             * ISO 8601 datetime with timezone
             */
            lastLoginAt?: string;
            /**
             * When the record was created
             */
            createdAt: string;
            /**
             * When the record was last updated
             */
            updatedAt: string;
        };
        category?: CategoryResponse;
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
            method: 'PATCH',
            url: '/admin/businesses/{id}/rating',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update multiple businesses at once
     * @returns any Bulk business update results
     * @throws ApiError
     */
    public static bulkUpdateAdminBusinesses({
        requestBody,
    }: {
        requestBody?: {
            businessIds: Array<string>;
            updates: {
                active?: boolean;
                verified?: boolean;
                /**
                 * Universally Unique Identifier
                 */
                categoryId?: string;
            };
        },
    }): CancelablePromise<{
        successful: number;
        failed: number;
        errors?: Array<{
            /**
             * Universally Unique Identifier
             */
            businessId: string;
            error: string;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/admin/businesses/bulk',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete multiple businesses
     * @returns any Bulk business deletion results
     * @throws ApiError
     */
    public static bulkDeleteAdminBusinesses({
        requestBody,
    }: {
        requestBody?: {
            businessIds: Array<string>;
        },
    }): CancelablePromise<{
        successful: number;
        failed: number;
        errors?: Array<{
            /**
             * Universally Unique Identifier
             */
            businessId: string;
            error: string;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/businesses/bulk',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
