/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Bulk action on multiple files
 */
export type AdminBulkFileActionRequest = {
    fileIds: Array<string>;
    action: 'delete' | 'make_public' | 'make_private' | 'change_status';
    /**
     * File processing status
     */
    newStatus?: 'pending' | 'uploaded' | 'processing' | 'processed' | 'failed' | 'deleted';
};

