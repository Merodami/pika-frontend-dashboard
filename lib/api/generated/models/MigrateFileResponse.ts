/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * File migration result
 */
export type MigrateFileResponse = {
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
};

