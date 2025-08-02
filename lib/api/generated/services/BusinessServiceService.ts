/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BusinessServiceService {
    /**
     * Get business details by ID
     * @returns any Business details
     * @throws ApiError
     */
    public static getInternalBusinessById({
        id,
        include,
    }: {
        /**
         * Universally Unique Identifier
         */
        id: string,
        /**
         * Comma-separated relations: user,category
         */
        include?: string,
    }): CancelablePromise<{
        /**
         * Universally Unique Identifier
         */
        id: string;
        userId: string;
        businessNameKey: string;
        businessDescriptionKey?: string;
        /**
         * Universally Unique Identifier
         */
        categoryId: string;
        verified: boolean;
        active: boolean;
        avgRating: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/businesses/{id}',
            path: {
                'id': id,
            },
            query: {
                'include': include,
            },
        });
    }
    /**
     * Get businesses in a specific category
     * @returns any Category businesses
     * @throws ApiError
     */
    public static getInternalBusinessesByCategory({
        id,
        page = 1,
        limit = 20,
        sortBy,
        sortOrder = 'desc',
        search,
        onlyActive,
        onlyVerified,
        include,
    }: {
        /**
         * Universally Unique Identifier
         */
        id: string,
        /**
         * Page number
         */
        page?: number,
        /**
         * Items per page
         */
        limit?: number,
        /**
         * Field to sort by
         */
        sortBy?: string,
        /**
         * Sort order
         */
        sortOrder?: 'asc' | 'desc',
        /**
         * Search query
         */
        search?: string,
        onlyActive?: boolean,
        onlyVerified?: boolean,
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
            userId: string;
            businessNameKey: string;
            businessDescriptionKey?: string;
            /**
             * Universally Unique Identifier
             */
            categoryId: string;
            verified: boolean;
            active: boolean;
            avgRating: number;
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
            url: '/categories/{categoryId}/businesses',
            path: {
                'id': id,
            },
            query: {
                'page': page,
                'limit': limit,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
                'search': search,
                'onlyActive': onlyActive,
                'onlyVerified': onlyVerified,
                'include': include,
            },
        });
    }
    /**
     * Get multiple businesses by IDs
     * @returns any Businesses data
     * @throws ApiError
     */
    public static bulkGetInternalBusinesses({
        requestBody,
    }: {
        requestBody?: {
            businessIds: Array<string>;
            /**
             * Comma-separated relations: user,category
             */
            include?: string;
        },
    }): CancelablePromise<{
        businesses: Array<{
            /**
             * Universally Unique Identifier
             */
            id: string;
            userId: string;
            businessNameKey: string;
            businessDescriptionKey?: string;
            /**
             * Universally Unique Identifier
             */
            categoryId: string;
            verified: boolean;
            active: boolean;
            avgRating: number;
        }>;
        notFound?: Array<string>;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/businesses/bulk',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Validate businesses exist and meet criteria
     * @returns any Business validation results
     * @throws ApiError
     */
    public static validateInternalBusinesses({
        requestBody,
    }: {
        requestBody?: {
            businessIds: Array<string>;
            checkActive?: boolean;
            checkVerified?: boolean;
        },
    }): CancelablePromise<{
        valid: Array<string>;
        invalid: Array<{
            /**
             * Universally Unique Identifier
             */
            id: string;
            reason: string;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/businesses/validate',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all businesses owned by a user
     * @returns any User businesses
     * @throws ApiError
     */
    public static getInternalBusinessesByUser({
        requestBody,
    }: {
        requestBody?: {
            userId: string;
            includeInactive?: boolean;
            includeUnverified?: boolean;
        },
    }): CancelablePromise<{
        businesses: Array<{
            /**
             * Universally Unique Identifier
             */
            id: string;
            userId: string;
            businessNameKey: string;
            businessDescriptionKey?: string;
            /**
             * Universally Unique Identifier
             */
            categoryId: string;
            verified: boolean;
            active: boolean;
            avgRating: number;
        }>;
        totalCount: number;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/businesses/by-user',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Check if business exists and is active
     * @returns any Business existence check result
     * @throws ApiError
     */
    public static checkInternalBusinessExists({
        requestBody,
    }: {
        requestBody?: {
            /**
             * Universally Unique Identifier
             */
            businessId: string;
        },
    }): CancelablePromise<{
        exists: boolean;
        isActive?: boolean;
        isVerified?: boolean;
        /**
         * Internal business data for services
         */
        business?: {
            /**
             * Universally Unique Identifier
             */
            id: string;
            userId: string;
            businessNameKey: string;
            businessDescriptionKey?: string;
            /**
             * Universally Unique Identifier
             */
            categoryId: string;
            verified: boolean;
            active: boolean;
            avgRating: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/businesses/exists',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
