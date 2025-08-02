/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Get files for a specific user
 */
export type GetUserFilesRequest = {
    userId: string;
    /**
     * File type category
     */
    fileType?: 'image' | 'video' | 'document' | 'audio' | 'other';
    /**
     * File processing status
     */
    status?: 'pending' | 'uploaded' | 'processing' | 'processed' | 'failed' | 'deleted';
    limit?: number;
    offset?: number;
};

