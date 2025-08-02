/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BusinessQueryParams = {
    /**
     * Page number
     */
    page?: number;
    /**
     * Items per page
     */
    limit?: number;
    sortBy?: 'businessName' | 'avgRating' | 'verified' | 'active' | 'createdAt' | 'updatedAt';
    /**
     * Sort order
     */
    sortOrder?: 'asc' | 'desc';
    /**
     * Search query
     */
    search?: string;
    /**
     * Filter by category
     */
    categoryId?: string;
    /**
     * Filter by verification status
     */
    verified?: boolean;
    /**
     * Filter by active status
     */
    active?: boolean;
    /**
     * Minimum rating filter
     */
    minRating?: number;
};

