/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Category information for admin management with hierarchical structure
 */
export type AdminCategoryResponse = {
    /**
     * Universally Unique Identifier
     */
    id: string;
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
     * Parent category ID for hierarchical structure
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
    /**
     * URL-friendly category identifier
     */
    slug: string;
    /**
     * Hierarchy level (1 for root categories)
     */
    level: number;
    /**
     * Materialized path for hierarchy navigation
     */
    path: string;
    /**
     * User who created the category
     */
    createdBy: string;
    /**
     * User who last updated the category
     */
    updatedBy?: string;
    /**
     * Child categories for hierarchical display
     */
    children?: Array<AdminCategoryResponse>;
    /**
     * When the record was created
     */
    createdAt: string;
    /**
     * When the record was last updated
     */
    updatedAt: string;
};

