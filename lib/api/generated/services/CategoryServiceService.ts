/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CategoryServiceService {
    /**
     * Get internal category list
     * @returns any Internal category list
     * @throws ApiError
     */
    public static getInternalCategoryList({
        isActive,
    }: {
        isActive?: boolean,
    }): CancelablePromise<{
        /**
         * Page items
         */
        data: Array<{
            /**
             * Universally Unique Identifier
             */
            id: string;
            nameKey: string;
            descriptionKey?: string;
            icon?: string;
            /**
             * Universally Unique Identifier
             */
            parentId?: string;
            isActive: boolean;
            sortOrder: number;
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
            url: '/categories',
            query: {
                'isActive': isActive,
            },
        });
    }
    /**
     * Get category hierarchy for internal use
     * @returns any Category hierarchy
     * @throws ApiError
     */
    public static getInternalCategoryHierarchy({
        isActive,
    }: {
        isActive?: boolean,
    }): CancelablePromise<{
        data: Array<{
            /**
             * Universally Unique Identifier
             */
            id: string;
            nameKey: string;
            descriptionKey?: string;
            icon?: string;
            /**
             * Universally Unique Identifier
             */
            parentId?: string;
            isActive: boolean;
            sortOrder: number;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/categories/hierarchy',
            query: {
                'isActive': isActive,
            },
        });
    }
    /**
     * Get multiple categories by IDs
     * @returns any Category list
     * @throws ApiError
     */
    public static bulkGetInternalCategories({
        requestBody,
    }: {
        requestBody?: {
            categoryIds: Array<string>;
        },
    }): CancelablePromise<{
        /**
         * Page items
         */
        data: Array<{
            /**
             * Universally Unique Identifier
             */
            id: string;
            nameKey: string;
            descriptionKey?: string;
            icon?: string;
            /**
             * Universally Unique Identifier
             */
            parentId?: string;
            isActive: boolean;
            sortOrder: number;
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
            method: 'POST',
            url: '/categories/bulk',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Validate categories exist and are active
     * @returns any Category validation results
     * @throws ApiError
     */
    public static validateInternalCategories({
        requestBody,
    }: {
        requestBody?: {
            categoryIds: Array<string>;
            checkActive?: boolean;
        },
    }): CancelablePromise<{
        /**
         * Whether all categories are valid
         */
        valid: boolean;
        /**
         * Individual validation results
         */
        results: Array<{
            /**
             * Universally Unique Identifier
             */
            categoryId: string;
            exists: boolean;
            isActive: boolean;
            valid: boolean;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/categories/validate',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Check if category exists
     * @returns any Category existence check result
     * @throws ApiError
     */
    public static checkInternalCategoryExists({
        requestBody,
    }: {
        requestBody?: {
            /**
             * Universally Unique Identifier
             */
            categoryId: string;
        },
    }): CancelablePromise<{
        exists: boolean;
        isActive?: boolean;
        /**
         * Internal category data for services
         */
        category?: {
            /**
             * Universally Unique Identifier
             */
            id: string;
            nameKey: string;
            descriptionKey?: string;
            icon?: string;
            /**
             * Universally Unique Identifier
             */
            parentId?: string;
            isActive: boolean;
            sortOrder: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/categories/exists',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
