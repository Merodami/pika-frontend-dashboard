/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Update category information
 */
export type UpdateCategoryRequest = {
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
};

