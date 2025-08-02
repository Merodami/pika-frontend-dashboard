/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Internal file response
 */
export type InternalFileResponse = {
    /**
     * Universally Unique Identifier
     */
    id: string;
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
     * File processing status
     */
    status: 'pending' | 'uploaded' | 'processing' | 'processed' | 'failed' | 'deleted';
    /**
     * Supported storage provider
     */
    provider: 'aws_s3' | 'local' | 'minio';
    bucketName?: string;
    region?: string;
    isPublic: boolean;
    metadata?: Record<string, string>;
    /**
     * ISO 8601 datetime with timezone
     */
    uploadedAt?: string;
    /**
     * ISO 8601 datetime with timezone
     */
    createdAt: string;
    /**
     * ISO 8601 datetime with timezone
     */
    updatedAt: string;
};

