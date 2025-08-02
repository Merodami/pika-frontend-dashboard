/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * File storage log entry
 */
export type FileStorageLog = {
    /**
     * Universally Unique Identifier
     */
    id: string;
    userId: string;
    /**
     * Storage key/path
     */
    fileKey: string;
    fileName: string;
    /**
     * Size in bytes
     */
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
    metadata?: Record<string, any>;
    error?: string;
    /**
     * When the record was created
     */
    createdAt: string;
    /**
     * When the record was last updated
     */
    updatedAt: string;
};

