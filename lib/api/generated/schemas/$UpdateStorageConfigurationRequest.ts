/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UpdateStorageConfigurationRequest = {
    description: `Update storage configuration`,
    properties: {
        provider: {
            type: 'Enum',
            isRequired: true,
        },
        config: {
            properties: {
                bucket: {
                    type: 'string',
                },
                region: {
                    type: 'string',
                },
                endpoint: {
                    type: 'string',
                },
                maxFileSize: {
                    type: 'number',
                },
                allowedMimeTypes: {
                    type: 'array',
                    contains: {
                        type: 'string',
                    },
                },
            },
        },
        globalSettings: {
            properties: {
                maxFileSize: {
                    type: 'number',
                },
                maxFilesPerUser: {
                    type: 'number',
                },
                defaultExpiration: {
                    type: 'number',
                },
                compressionEnabled: {
                    type: 'boolean',
                },
                virusScanEnabled: {
                    type: 'boolean',
                },
            },
        },
    },
} as const;
