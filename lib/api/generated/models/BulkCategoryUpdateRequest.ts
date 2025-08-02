/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Update multiple categories at once
 */
export type BulkCategoryUpdateRequest = {
    categoryIds: Array<string>;
    updates: {
        isActive?: boolean;
        /**
         * Universally Unique Identifier
         */
        parentId?: string;
    };
};

