/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * File upload request body (from multipart form)
 */
export type FileUploadRequest = {
    /**
     * Target folder for upload
     */
    folder?: string;
    /**
     * Whether file should be publicly accessible
     */
    isPublic?: string;
    /**
     * JSON string of additional metadata
     */
    metadata?: string;
};

