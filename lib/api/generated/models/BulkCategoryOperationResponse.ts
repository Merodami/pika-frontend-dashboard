/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Bulk category operation result
 */
export type BulkCategoryOperationResponse = {
    successful: number;
    failed: number;
    errors?: Array<{
        /**
         * Universally Unique Identifier
         */
        categoryId: string;
        error: string;
    }>;
};

