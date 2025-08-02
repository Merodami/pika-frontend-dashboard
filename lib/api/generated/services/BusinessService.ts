/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoryResponse } from '../models/CategoryResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BusinessService {
    /**
     * List all active businesses
     * @returns any List of businesses
     * @throws ApiError
     */
    public static getBusinessList({
        page = 1,
        limit = 20,
        sortBy = 'businessName',
        sortOrder = 'desc',
        search,
        categoryId,
        verified,
        active,
        minRating,
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
         * Filter by category
         */
        categoryId?: string,
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
            url: '/businesses',
            query: {
                'page': page,
                'limit': limit,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
                'search': search,
                'categoryId': categoryId,
                'verified': verified,
                'active': active,
                'minRating': minRating,
            },
        });
    }
}
