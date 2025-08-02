/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Update storage configuration
 */
export type UpdateStorageConfigurationRequest = {
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
};

