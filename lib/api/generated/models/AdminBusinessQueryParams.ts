/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AdminBusinessQueryParams = {
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
     * Filter by owner
     */
    userId?: string;
    /**
     * Filter by category
     */
    categoryId?: string;
    /**
     * Filter by status
     */
    status?: 'all' | 'active' | 'inactive' | 'verified' | 'unverified';
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
    /**
     * Maximum rating filter
     */
    maxRating?: number;
    /**
     * Include soft deleted businesses
     */
    includeDeleted?: boolean;
    /**
     * Created date from
     */
    createdFrom?: string;
    /**
     * Created date to
     */
    createdTo?: string;
    /**
     * Updated date from
     */
    updatedFrom?: string;
    /**
     * Updated date to
     */
    updatedTo?: string;
    /**
     * Comma-separated relations: user,category
     */
    include?: string;
};

