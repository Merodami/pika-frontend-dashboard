/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AdminCategoryQueryParams = {
    /**
     * Page number
     */
    page?: number;
    /**
     * Items per page
     */
    limit?: number;
    /**
     * Field to sort categories by
     */
    sortBy?: 'name' | 'sortOrder' | 'createdAt' | 'updatedAt';
    /**
     * Sort order
     */
    sortOrder?: 'asc' | 'desc';
    /**
     * Search query
     */
    search?: string;
    /**
     * Filter by parent category
     */
    parentId?: string;
    /**
     * Filter by active status
     */
    isActive?: boolean;
    /**
     * Filter by creator
     */
    createdBy?: string;
    /**
     * Comma-separated relations: parent,children
     */
    include?: string;
};

