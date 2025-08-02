/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StorageService {
    /**
     * Upload a file
     * @returns any File uploaded successfully
     * @throws ApiError
     */
    public static uploadFile({
        formData,
    }: {
        formData?: {
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
        },
    }): CancelablePromise<{
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
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/storage/upload',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Invalid file or request`,
            },
        });
    }
    /**
     * Upload multiple files
     * @returns any Batch upload completed
     * @throws ApiError
     */
    public static batchUploadFiles({
        formData,
    }: {
        formData?: {
            /**
             * Target folder for uploads
             */
            folder?: string;
            /**
             * Whether files should be publicly accessible
             */
            isPublic?: string;
        },
    }): CancelablePromise<{
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
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/storage/batch-upload',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Invalid request`,
            },
        });
    }
    /**
     * Get presigned URL for file access
     * @returns any Presigned URL generated
     * @throws ApiError
     */
    public static getFileUrl({
        fileId,
        expiresIn = 3600,
    }: {
        /**
         * Universally Unique Identifier
         */
        fileId: string,
        /**
         * URL expiration time in seconds
         */
        expiresIn?: number,
    }): CancelablePromise<{
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
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/storage/files/{fileId}/url',
            path: {
                'fileId': fileId,
            },
            query: {
                'expiresIn': expiresIn,
            },
            errors: {
                404: `File not found`,
            },
        });
    }
    /**
     * Get user file upload history
     * @returns any File history
     * @throws ApiError
     */
    public static getFileHistory({
        status,
        folder,
        contentType,
        provider,
        fromDate,
        toDate,
        page = 1,
        limit = 20,
        sortBy = 'uploadedAt',
        sortOrder = 'desc',
    }: {
        status?: string,
        folder?: string,
        contentType?: string,
        provider?: string,
        /**
         * ISO 8601 datetime with timezone
         */
        fromDate?: string,
        /**
         * ISO 8601 datetime with timezone
         */
        toDate?: string,
        page?: number,
        limit?: number,
        /**
         * Field to sort files by
         */
        sortBy?: 'uploadedAt' | 'fileSize' | 'fileName' | 'createdAt' | 'updatedAt',
        sortOrder?: 'asc' | 'desc',
    }): CancelablePromise<{
        /**
         * Page items
         */
        data: Array<{
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
        }>;
        /**
         * Pagination information
         */
        pagination: {
            /**
             * Current page number
             */
            page: number;
            /**
             * Items per page
             */
            limit: number;
            /**
             * Total number of items
             */
            total: number;
            /**
             * Total number of pages
             */
            totalPages: number;
            /**
             * Whether there is a next page
             */
            hasNext: boolean;
            /**
             * Whether there is a previous page
             */
            hasPrev: boolean;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/storage/history',
            query: {
                'status': status,
                'folder': folder,
                'contentType': contentType,
                'provider': provider,
                'fromDate': fromDate,
                'toDate': toDate,
                'page': page,
                'limit': limit,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
            },
        });
    }
}
