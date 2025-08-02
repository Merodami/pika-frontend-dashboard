/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Presigned URL for file access
 */
export type FileUrlResponse = {
    url: string;
    /**
     * ISO 8601 datetime with timezone
     */
    expiresAt: string;
    /**
     * Universally Unique Identifier
     */
    fileId: string;
    fileName: string;
    mimeType: string;
};

