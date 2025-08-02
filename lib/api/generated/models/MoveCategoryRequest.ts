/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Move category to different parent or change sort order
 */
export type MoveCategoryRequest = {
    /**
     * New parent category ID (null for root level)
     */
    parentId?: string;
    /**
     * New sort order within parent
     */
    sortOrder?: number;
};

