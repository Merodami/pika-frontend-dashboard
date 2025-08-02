/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Admin file search parameters
 */
export type AdminFileQueryParams = {
    /**
     * Search in filename or file key
     */
    search?: string;
    userId?: string;
    /**
     * File type category
     */
    fileType?: 'image' | 'video' | 'document' | 'audio' | 'other';
    /**
     * File processing status
     */
    status?: 'pending' | 'uploaded' | 'processing' | 'processed' | 'failed' | 'deleted';
    /**
     * Supported storage provider
     */
    provider?: 'aws_s3' | 'local' | 'minio';
    mimeType?: string;
    minSize?: number;
    maxSize?: number;
    isPublic?: boolean | null;
    /**
     * ISO 8601 datetime with timezone
     */
    fromDate?: string;
    /**
     * ISO 8601 datetime with timezone
     */
    toDate?: string;
    page?: number;
    limit?: number;
    /**
     * Field to sort files by
     */
    sortBy?: 'uploadedAt' | 'fileSize' | 'fileName' | 'createdAt' | 'updatedAt';
    /**
     * Sort order - ascending (asc) or descending (desc)
     */
    sortOrder?: 'asc' | 'desc';
    /**
     * Comma-separated relations: user
     */
    include?: string;
};

