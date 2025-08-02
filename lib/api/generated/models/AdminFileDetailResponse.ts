/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Admin file details with user information
 */
export type AdminFileDetailResponse = {
    /**
     * Universally Unique Identifier
     */
    id: string;
    userId: string;
    userName?: string;
    userEmail?: string;
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
    /**
     * ISO 8601 datetime with timezone
     */
    uploadedAt?: string;
    /**
     * ISO 8601 datetime with timezone
     */
    deletedAt?: string;
    metadata?: Record<string, string>;
    error?: string;
    isPublic?: boolean;
    downloadCount?: number;
    /**
     * ISO 8601 datetime with timezone
     */
    lastAccessedAt?: string;
    /**
     * When the record was created
     */
    createdAt: string;
    /**
     * When the record was last updated
     */
    updatedAt: string;
};

