/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Migrate file between storage providers
 */
export type MigrateFileRequest = {
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
};

