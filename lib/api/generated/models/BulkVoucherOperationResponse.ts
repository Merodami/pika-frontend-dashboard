/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BulkVoucherOperationResponse = {
    /**
     * Number of successful operations
     */
    successful: number;
    /**
     * Number of failed operations
     */
    failed: number;
    /**
     * Details of failed operations
     */
    errors?: Array<{
        /**
         * Universally Unique Identifier
         */
        voucherId: string;
        error: string;
    }>;
};

