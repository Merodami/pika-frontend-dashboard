/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminCategoryResponse } from '../models/AdminCategoryResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CategoryManagementService {
    /**
     * Create a new category
     * @returns AdminCategoryResponse Category created successfully
     * @throws ApiError
     */
    public static createAdminCategory({
        requestBody,
    }: {
        requestBody?: {
            /**
             * Translation key for category name
             */
            nameKey: string;
            /**
             * Translation key for category description
             */
            descriptionKey?: string;
            /**
             * Category icon identifier
             */
            icon?: string;
            /**
             * Parent category ID
             */
            parentId?: string;
            /**
             * Whether category is active
             */
            isActive?: boolean;
            /**
             * Sort order for display
             */
            sortOrder?: number;
        },
    }): CancelablePromise<AdminCategoryResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/categories',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid category data`,
            },
        });
    }
    /**
     * Get category details
     * @returns AdminCategoryResponse Category details
     * @throws ApiError
     */
    public static getAdminCategoryById({
        id,
    }: {
        /**
         * Universally Unique Identifier
         */
        id: string,
    }): CancelablePromise<AdminCategoryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/categories/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Category not found`,
            },
        });
    }
    /**
     * Update category information
     * @returns AdminCategoryResponse Category updated successfully
     * @throws ApiError
     */
    public static updateAdminCategory({
        id,
        requestBody,
    }: {
        /**
         * Universally Unique Identifier
         */
        id: string,
        requestBody?: {
            /**
             * Translation key for category name
             */
            nameKey?: string;
            /**
             * Translation key for category description
             */
            descriptionKey?: string;
            /**
             * Category icon identifier
             */
            icon?: string;
            /**
             * Parent category ID
             */
            parentId?: string;
            /**
             * Whether category is active
             */
            isActive?: boolean;
            /**
             * Sort order for display
             */
            sortOrder?: number;
        },
    }): CancelablePromise<AdminCategoryResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/categories/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Category not found`,
            },
        });
    }
    /**
     * Delete a category
     * @returns void
     * @throws ApiError
     */
    public static deleteAdminCategory({
        id,
    }: {
        /**
         * Universally Unique Identifier
         */
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/categories/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Category not found`,
            },
        });
    }
    /**
     * Get category hierarchy tree
     * @returns any Category tree structure
     * @throws ApiError
     */
    public static getAdminCategoryTree(): CancelablePromise<{
        categories: Array<AdminCategoryResponse>;
        totalCount: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/categories/tree',
        });
    }
    /**
     * Move category to different parent
     * @returns AdminCategoryResponse Category moved successfully
     * @throws ApiError
     */
    public static moveAdminCategory({
        id,
        requestBody,
    }: {
        /**
         * Universally Unique Identifier
         */
        id: string,
        requestBody?: {
            /**
             * New parent category ID (null for root level)
             */
            parentId?: string;
            /**
             * New sort order within parent
             */
            sortOrder?: number;
        },
    }): CancelablePromise<AdminCategoryResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/categories/{id}/move',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Category not found`,
            },
        });
    }
    /**
     * Toggle category activation status
     * @returns AdminCategoryResponse Category activation toggled successfully
     * @throws ApiError
     */
    public static toggleAdminCategoryActivation({
        id,
        requestBody,
    }: {
        /**
         * Universally Unique Identifier
         */
        id: string,
        requestBody?: {
            /**
             * New activation status
             */
            isActive: boolean;
        },
    }): CancelablePromise<AdminCategoryResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/categories/{id}/activation',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Category not found`,
            },
        });
    }
    /**
     * Update multiple categories
     * @returns any Categories updated successfully
     * @throws ApiError
     */
    public static bulkUpdateAdminCategories({
        requestBody,
    }: {
        requestBody?: {
            categoryIds: Array<string>;
            updates: {
                isActive?: boolean;
                /**
                 * Universally Unique Identifier
                 */
                parentId?: string;
            };
        },
    }): CancelablePromise<{
        successful: number;
        failed: number;
        errors?: Array<{
            /**
             * Universally Unique Identifier
             */
            categoryId: string;
            error: string;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/categories/bulk-update',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request data`,
            },
        });
    }
    /**
     * Delete multiple categories
     * @returns any Categories deleted successfully
     * @throws ApiError
     */
    public static bulkDeleteAdminCategories({
        requestBody,
    }: {
        requestBody?: {
            categoryIds: Array<string>;
        },
    }): CancelablePromise<{
        successful: number;
        failed: number;
        errors?: Array<{
            /**
             * Universally Unique Identifier
             */
            categoryId: string;
            error: string;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/categories/bulk-delete',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request data`,
            },
        });
    }
}
