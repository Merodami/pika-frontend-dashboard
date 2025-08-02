/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Bulk file action results
 */
export type AdminBulkFileActionResponse = {
    successful: Array<string>;
    failed: Array<{
        /**
         * Universally Unique Identifier
         */
        fileId: string;
        error: string;
    }>;
    totalProcessed: number;
    totalSuccessful: number;
    totalFailed: number;
};

