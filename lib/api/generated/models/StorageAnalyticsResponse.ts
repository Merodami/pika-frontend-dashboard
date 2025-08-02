/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Storage usage analytics
 */
export type StorageAnalyticsResponse = {
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
};

