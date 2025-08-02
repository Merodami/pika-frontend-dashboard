/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StorageManagementService {
    /**
     * Delete a file
     * @returns void
     * @throws ApiError
     */
    public static deleteAdminFile({
        fileId,
    }: {
        /**
         * Universally Unique Identifier
         */
        fileId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
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
     * Update file information
     * @returns any File updated successfully
     * @throws ApiError
     */
    public static updateAdminFile({
        fileId,
        requestBody,
    }: {
        /**
         * Universally Unique Identifier
         */
        fileId: string,
        requestBody?: {
            fileName?: string;
            /**
             * File processing status
             */
            status?: 'pending' | 'uploaded' | 'processing' | 'processed' | 'failed' | 'deleted';
            isPublic?: boolean;
            metadata?: Record<string, string>;
        },
    }): CancelablePromise<{
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
    }> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/storage/files/{fileId}',
            path: {
                'fileId': fileId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `File not found`,
            },
        });
    }
    /**
     * List all files with admin details
     * @returns any List of files
     * @throws ApiError
     */
    public static getAdminFileList({
        search,
        userId,
        fileType,
        status,
        provider,
        mimeType,
        minSize,
        maxSize,
        isPublic,
        fromDate,
        toDate,
        page = 1,
        limit = 20,
        sortBy = 'uploadedAt',
        sortOrder = 'desc',
        include,
    }: {
        /**
         * Search in filename or file key
         */
        search?: string,
        userId?: string,
        /**
         * File type category
         */
        fileType?: 'image' | 'video' | 'document' | 'audio' | 'other',
        /**
         * File processing status
         */
        status?: 'pending' | 'uploaded' | 'processing' | 'processed' | 'failed' | 'deleted',
        /**
         * Supported storage provider
         */
        provider?: 'aws_s3' | 'local' | 'minio',
        mimeType?: string,
        minSize?: number,
        maxSize?: number,
        isPublic?: boolean | null,
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
        /**
         * Sort order - ascending (asc) or descending (desc)
         */
        sortOrder?: 'asc' | 'desc',
        /**
         * Comma-separated relations: user
         */
        include?: string,
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
            url: '/storage/files',
            query: {
                'search': search,
                'userId': userId,
                'fileType': fileType,
                'status': status,
                'provider': provider,
                'mimeType': mimeType,
                'minSize': minSize,
                'maxSize': maxSize,
                'isPublic': isPublic,
                'fromDate': fromDate,
                'toDate': toDate,
                'page': page,
                'limit': limit,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
                'include': include,
            },
        });
    }
    /**
     * Perform bulk actions on files
     * @returns any Bulk action completed
     * @throws ApiError
     */
    public static bulkActionAdminFiles({
        requestBody,
    }: {
        requestBody?: {
            fileIds: Array<string>;
            action: 'delete' | 'make_public' | 'make_private' | 'change_status';
            /**
             * File processing status
             */
            newStatus?: 'pending' | 'uploaded' | 'processing' | 'processed' | 'failed' | 'deleted';
        },
    }): CancelablePromise<{
        successful: Array<string>;
        failed: Array<{
            /**
             * Universally Unique Identifier
             */
            fileId: string;
            error: string;
        }>;
        totalProcessed: number;
        totalSuccessful: number;
        totalFailed: number;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/storage/files/bulk-action',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request data`,
            },
        });
    }
    /**
     * Get storage usage analytics
     * @returns any Storage analytics data
     * @throws ApiError
     */
    public static getAdminStorageAnalytics(): CancelablePromise<{
        period: {
            /**
             * ISO 8601 datetime with timezone
             */
            start: string;
            /**
             * ISO 8601 datetime with timezone
             */
            end: string;
        };
        totalFiles: number;
        /**
         * Total size in bytes
         */
        totalSize: number;
        newFiles: number;
        deletedFiles: number;
        /**
         * Average size in bytes
         */
        averageFileSize?: number;
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
        filesByProvider: {
            aws_s3?: number;
            local?: number;
            minio?: number;
        };
        storageByProvider: {
            aws_s3?: number;
            local?: number;
            minio?: number;
        };
        topUsers: Array<{
            userId: string;
            userName: string;
            fileCount: number;
            totalSize: number;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/storage/analytics',
        });
    }
    /**
     * Get storage service configuration
     * @returns any Storage configuration
     * @throws ApiError
     */
    public static getAdminStorageConfiguration(): CancelablePromise<{
        providers: Array<{
            /**
             * Supported storage provider
             */
            name: 'aws_s3' | 'local' | 'minio';
            isActive: boolean;
            isDefault: boolean;
            config: {
                bucket?: string;
                region?: string;
                endpoint?: string;
                maxFileSize: number;
                allowedMimeTypes: Array<string>;
            };
        }>;
        globalSettings: {
            maxFileSize: number;
            maxFilesPerUser?: number;
            defaultExpiration: number;
            compressionEnabled: boolean;
            virusScanEnabled: boolean;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/storage/configuration',
        });
    }
    /**
     * Update storage service configuration
     * @returns any Configuration updated successfully
     * @throws ApiError
     */
    public static updateAdminStorageConfiguration({
        requestBody,
    }: {
        requestBody?: {
            /**
             * Supported storage provider
             */
            provider: 'aws_s3' | 'local' | 'minio';
            config?: {
                bucket?: string;
                region?: string;
                endpoint?: string;
                maxFileSize?: number;
                allowedMimeTypes?: Array<string>;
            };
            globalSettings?: {
                maxFileSize?: number;
                maxFilesPerUser?: number;
                defaultExpiration?: number;
                compressionEnabled?: boolean;
                virusScanEnabled?: boolean;
            };
        },
    }): CancelablePromise<{
        providers: Array<{
            /**
             * Supported storage provider
             */
            name: 'aws_s3' | 'local' | 'minio';
            isActive: boolean;
            isDefault: boolean;
            config: {
                bucket?: string;
                region?: string;
                endpoint?: string;
                maxFileSize: number;
                allowedMimeTypes: Array<string>;
            };
        }>;
        globalSettings: {
            maxFileSize: number;
            maxFilesPerUser?: number;
            defaultExpiration: number;
            compressionEnabled: boolean;
            virusScanEnabled: boolean;
        };
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/storage/configuration',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid configuration data`,
            },
        });
    }
}
