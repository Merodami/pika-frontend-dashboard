/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Internal bulk delete files request
 */
export type InternalBulkDeleteRequest = {
    fileIds: Array<string>;
    /**
     * If provided, only delete files owned by this user
     */
    userId?: string;
    reason?: string;
};

