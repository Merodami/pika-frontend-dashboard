/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StorageServiceService {
    /**
     * Get file record by ID
     * @returns any File record
     * @throws ApiError
     */
    public static getInternalFileById({
        fileId,
    }: {
        /**
         * Universally Unique Identifier
         */
        fileId: string,
    }): CancelablePromise<{
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
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/storage/files/{fileId}',
            path: {
                'fileId': fileId,
            },
            errors: {
                404: `File not found`,
            },
        });
    }
    /**
     * Create file record
     * @returns any File record created
     * @throws ApiError
     */
    public static createInternalFile({
        requestBody,
    }: {
        requestBody?: {
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
        },
    }): CancelablePromise<{
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
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/storage/files',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Bulk delete files
     * @returns any Bulk delete results
     * @throws ApiError
     */
    public static bulkDeleteInternalFiles({
        requestBody,
    }: {
        requestBody?: {
            fileIds: Array<string>;
            /**
             * If provided, only delete files owned by this user
             */
            userId?: string;
            reason?: string;
        },
    }): CancelablePromise<{
        deleted: Array<string>;
        failed: Array<{
            /**
             * Universally Unique Identifier
             */
            fileId: string;
            error: string;
        }>;
        totalDeleted: number;
        totalFailed: number;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/storage/files/bulk',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get files for a user
     * @returns any User files
     * @throws ApiError
     */
    public static getInternalUserFiles({
        requestBody,
    }: {
        requestBody?: {
            userId: string;
            /**
             * File type category
             */
            fileType?: 'image' | 'video' | 'document' | 'audio' | 'other';
            /**
             * File processing status
             */
            status?: 'pending' | 'uploaded' | 'processing' | 'processed' | 'failed' | 'deleted';
            limit?: number;
            offset?: number;
        },
    }): CancelablePromise<Array<{
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
    }>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/storage/users/files',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get user file summary
     * @returns any User file summary
     * @throws ApiError
     */
    public static getInternalUserFileSummary({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<{
        userId: string;
        totalFiles: number;
        /**
         * Total size in bytes
         */
        totalSize: number;
        filesByType: {
            image?: number;
            video?: number;
            document?: number;
            audio?: number;
            other?: number;
        };
        filesByStatus: {
            pending?: number;
            uploaded?: number;
            processing?: number;
            processed?: number;
            failed?: number;
            deleted?: number;
        };
        /**
         * ISO 8601 datetime with timezone
         */
        oldestFile?: string;
        /**
         * ISO 8601 datetime with timezone
         */
        newestFile?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/storage/users/{userId}/summary',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * Check user storage quota
     * @returns any User quota information
     * @throws ApiError
     */
    public static checkInternalUserQuota({
        requestBody,
    }: {
        requestBody?: {
            userId: string;
            fileSize: number;
            /**
             * File type category
             */
            fileType?: 'image' | 'video' | 'document' | 'audio' | 'other';
        },
    }): CancelablePromise<{
        userId: string;
        canUpload: boolean;
        quotaExceeded: boolean;
        /**
         * Current usage in bytes
         */
        currentUsage: number;
        /**
         * Quota limit in bytes
         */
        quotaLimit: number;
        /**
         * Remaining space in bytes
         */
        remainingSpace: number;
        fileCountLimit?: number;
        currentFileCount: number;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/storage/quota/check',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Migrate file between providers
     * @returns any File migration result
     * @throws ApiError
     */
    public static migrateInternalFile({
        requestBody,
    }: {
        requestBody?: {
            /**
             * Universally Unique Identifier
             */
            fileId: string;
            /**
             * Supported storage provider
             */
            targetProvider: 'aws_s3' | 'local' | 'minio';
            targetBucket?: string;
            targetRegion?: string;
            deleteOriginal?: boolean;
        },
    }): CancelablePromise<{
        /**
         * Universally Unique Identifier
         */
        fileId: string;
        /**
         * Supported storage provider
         */
        oldProvider: 'aws_s3' | 'local' | 'minio';
        /**
         * Supported storage provider
         */
        newProvider: 'aws_s3' | 'local' | 'minio';
        oldFileKey: string;
        newFileKey: string;
        migrationStatus: 'success' | 'failed' | 'partial';
        error?: string;
        /**
         * ISO 8601 datetime with timezone
         */
        migratedAt: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/storage/files/migrate',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Cleanup orphaned files
     * @returns any Cleanup results
     * @throws ApiError
     */
    public static cleanupInternalOrphanedFiles({
        requestBody,
    }: {
        requestBody?: {
            /**
             * Delete files older than this date
             */
            olderThan: string;
            dryRun?: boolean;
            /**
             * Supported storage provider
             */
            provider?: 'aws_s3' | 'local' | 'minio';
            batchSize?: number;
        },
    }): CancelablePromise<{
        filesFound: number;
        filesDeleted: number;
        /**
         * Storage freed in bytes
         */
        storageFreed: number;
        errors: Array<string>;
        dryRun: boolean;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/storage/cleanup/orphaned',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Storage service health check
     * @returns any Storage service health
     * @throws ApiError
     */
    public static getInternalStorageHealth(): CancelablePromise<{
        service: 'storage';
        /**
         * System health status
         */
        status: 'healthy' | 'degraded' | 'unhealthy';
        timestamp: string;
        providersStatus: {
            /**
             * System health status
             */
            aws_s3?: 'healthy' | 'degraded' | 'unhealthy';
            /**
             * System health status
             */
            local?: 'healthy' | 'degraded' | 'unhealthy';
            /**
             * System health status
             */
            minio?: 'healthy' | 'degraded' | 'unhealthy';
        };
        totalFiles: number;
        /**
         * Total storage in bytes
         */
        totalStorageUsed: number;
        /**
         * For local storage
         */
        diskSpaceRemaining?: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/storage/health',
        });
    }
}
