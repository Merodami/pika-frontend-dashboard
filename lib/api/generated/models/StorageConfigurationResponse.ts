/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Storage service configuration
 */
export type StorageConfigurationResponse = {
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
};

