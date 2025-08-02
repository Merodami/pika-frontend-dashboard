/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SupportCommentSearchParams = {
    /**
     * Page number
     */
    page?: number;
    /**
     * Items per page
     */
    limit?: number;
    /**
     * Field to sort comments by
     */
    sortBy?: 'createdAt' | 'updatedAt';
    /**
     * Sort order - ascending (asc) or descending (desc)
     */
    sortOrder?: 'asc' | 'desc';
    /**
     * Search query
     */
    search?: string;
};

