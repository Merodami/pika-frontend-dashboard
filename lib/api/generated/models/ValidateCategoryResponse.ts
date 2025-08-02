/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Validation results for categories
 */
export type ValidateCategoryResponse = {
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
};

