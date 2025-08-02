/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Storage service health status
 */
export type StorageServiceHealthCheck = {
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
};

