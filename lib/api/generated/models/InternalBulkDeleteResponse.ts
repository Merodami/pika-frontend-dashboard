/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Internal bulk delete response
 */
export type InternalBulkDeleteResponse = {
    deleted: Array<string>;
    failed: Array<{
        /**
         * Universally Unique Identifier
         */
        fileId: string;
        error: string;
    }>;
    totalDeleted: number;
    totalFailed: number;
};

