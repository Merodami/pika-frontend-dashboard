/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Internal file creation request
 */
export type InternalCreateFileRequest = {
    userId: string;
    fileKey: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    /**
     * File type category
     */
    fileType: 'image' | 'video' | 'document' | 'audio' | 'other';
    /**
     * Supported storage provider
     */
    provider: 'aws_s3' | 'local' | 'minio';
    bucketName?: string;
    region?: string;
    isPublic?: boolean;
    metadata?: Record<string, string>;
};

