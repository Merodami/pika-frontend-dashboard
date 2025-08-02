/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoryResponse } from '../models/CategoryResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CategoriesService {
    /**
     * Get path from root to category
     * @returns any Category path from root
     * @throws ApiError
     */
    public static getCategoryPath({
        id,
    }: {
        /**
         * Universally Unique Identifier
         */
        id: string,
    }): CancelablePromise<{
        data: Array<CategoryResponse>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/categories/{id}/path',
            path: {
                'id': id,
            },
            errors: {
                404: `Category not found`,
            },
        });
    }
}
