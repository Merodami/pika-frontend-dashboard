/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoryResponse } from '../models/CategoryResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MyBusinessService {
    /**
     * Create my business
     * @returns any Business created successfully
     * @throws ApiError
     */
    public static createMyBusiness({
        requestBody,
    }: {
        requestBody?: {
            /**
             * Business name
             */
            businessName: string;
            /**
             * Business description
             */
            businessDescription?: string;
            /**
             * Category ID
             */
            categoryId: string;
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
         * Business owner profile when ?include=user
         */
        user?: {
            id: string;
            firstName: string;
            lastName: string;
            displayName?: string;
            avatarUrl?: string;
            bio?: string;
            /**
             * ISO 8601 datetime with timezone
             */
            createdAt: string;
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
            url: '/my/business',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get my business details
     * @returns any My business details
     * @throws ApiError
     */
    public static getMyBusiness(): CancelablePromise<{
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
         * Business owner profile when ?include=user
         */
        user?: {
            id: string;
            firstName: string;
            lastName: string;
            displayName?: string;
            avatarUrl?: string;
            bio?: string;
            /**
             * ISO 8601 datetime with timezone
             */
            createdAt: string;
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
            url: '/my/business',
        });
    }
    /**
     * Update my business
     * @returns any Business updated successfully
     * @throws ApiError
     */
    public static updateMyBusiness({
        requestBody,
    }: {
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
             * Category ID
             */
            categoryId?: string;
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
         * Business owner profile when ?include=user
         */
        user?: {
            id: string;
            firstName: string;
            lastName: string;
            displayName?: string;
            avatarUrl?: string;
            bio?: string;
            /**
             * ISO 8601 datetime with timezone
             */
            createdAt: string;
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
            url: '/my/business',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete my business
     * @returns void
     * @throws ApiError
     */
    public static deleteMyBusiness(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/my/business',
        });
    }
}
