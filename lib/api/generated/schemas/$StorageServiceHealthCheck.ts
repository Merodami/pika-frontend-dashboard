/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $StorageServiceHealthCheck = {
    description: `Storage service health status`,
    properties: {
        service: {
            type: 'Enum',
            isRequired: true,
        },
        status: {
            type: 'Enum',
            isRequired: true,
        },
        timestamp: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        providersStatus: {
            properties: {
                aws_s3: {
                    type: 'Enum',
                },
                local: {
                    type: 'Enum',
                },
                minio: {
                    type: 'Enum',
                },
            },
            isRequired: true,
        },
        totalFiles: {
            type: 'number',
            isRequired: true,
        },
        totalStorageUsed: {
            type: 'number',
            description: `Total storage in bytes`,
            isRequired: true,
        },
        diskSpaceRemaining: {
            type: 'number',
            description: `For local storage`,
        },
    },
} as const;
