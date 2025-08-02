/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Cleanup orphaned files request
 */
export type CleanupOrphanedFilesRequest = {
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
};

