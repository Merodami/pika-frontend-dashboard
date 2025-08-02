/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Admin update file details
 */
export type AdminUpdateFileRequest = {
    fileName?: string;
    /**
     * File processing status
     */
    status?: 'pending' | 'uploaded' | 'processing' | 'processed' | 'failed' | 'deleted';
    isPublic?: boolean;
    metadata?: Record<string, string>;
};

