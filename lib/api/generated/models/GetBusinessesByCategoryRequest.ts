/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Query parameters for getting businesses in a specific category
 */
export type GetBusinessesByCategoryRequest = {
    /**
     * Page number
     */
    page?: number;
    /**
     * Items per page
     */
    limit?: number;
    /**
     * Field to sort by
     */
    sortBy?: string;
    /**
     * Sort order
     */
    sortOrder?: 'asc' | 'desc';
    /**
     * Search query
     */
    search?: string;
    onlyActive?: boolean;
    onlyVerified?: boolean;
    /**
     * Comma-separated relations: user,category
     */
    include?: string;
};

