/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Category existence check result
 */
export type CheckCategoryExistsResponse = {
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
};

