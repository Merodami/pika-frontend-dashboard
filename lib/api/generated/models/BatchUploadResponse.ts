/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Response after batch file upload
 */
export type BatchUploadResponse = {
    successful: Array<{
        /**
         * Storage log ID
         */
        id: string;
        /**
         * Universally Unique Identifier
         */
        fileId: string;
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
        /**
         * Presigned URL if applicable
         */
        url?: string;
        /**
         * ISO 8601 datetime with timezone
         */
        uploadedAt: string;
        /**
         * File metadata
         */
        metadata?: Record<string, any>;
    }>;
    failed: Array<{
        fileName: string;
        error: string;
    }>;
    totalUploaded: number;
    totalFailed: number;
};

