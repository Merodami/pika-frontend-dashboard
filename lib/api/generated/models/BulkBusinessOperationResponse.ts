/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Bulk business operation result
 */
export type BulkBusinessOperationResponse = {
    successful: number;
    failed: number;
    errors?: Array<{
        /**
         * Universally Unique Identifier
         */
        businessId: string;
        error: string;
    }>;
};

