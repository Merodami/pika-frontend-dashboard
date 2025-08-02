/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $StorageConfigurationResponse = {
    description: `Storage service configuration`,
    properties: {
        providers: {
            type: 'array',
            contains: {
                properties: {
                    name: {
                        type: 'Enum',
                        isRequired: true,
                    },
                    isActive: {
                        type: 'boolean',
                        isRequired: true,
                    },
                    isDefault: {
                        type: 'boolean',
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
                                isRequired: true,
                            },
                            allowedMimeTypes: {
                                type: 'array',
                                contains: {
                                    type: 'string',
                                },
                                isRequired: true,
                            },
                        },
                        isRequired: true,
                    },
                },
            },
            isRequired: true,
        },
        globalSettings: {
            properties: {
                maxFileSize: {
                    type: 'number',
                    isRequired: true,
                },
                maxFilesPerUser: {
                    type: 'number',
                },
                defaultExpiration: {
                    type: 'number',
                    isRequired: true,
                },
                compressionEnabled: {
                    type: 'boolean',
                    isRequired: true,
                },
                virusScanEnabled: {
                    type: 'boolean',
                    isRequired: true,
                },
            },
            isRequired: true,
        },
    },
} as const;
