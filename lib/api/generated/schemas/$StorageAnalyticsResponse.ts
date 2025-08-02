/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $StorageAnalyticsResponse = {
    description: `Storage usage analytics`,
    properties: {
        period: {
            properties: {
                start: {
                    type: 'string',
                    description: `ISO 8601 datetime with timezone`,
                    isRequired: true,
                    format: 'date-time',
                },
                end: {
                    type: 'string',
                    description: `ISO 8601 datetime with timezone`,
                    isRequired: true,
                    format: 'date-time',
                },
            },
            isRequired: true,
        },
        totalFiles: {
            type: 'number',
            isRequired: true,
        },
        totalSize: {
            type: 'number',
            description: `Total size in bytes`,
            isRequired: true,
        },
        newFiles: {
            type: 'number',
            isRequired: true,
        },
        deletedFiles: {
            type: 'number',
            isRequired: true,
        },
        averageFileSize: {
            type: 'number',
            description: `Average size in bytes`,
        },
        filesByType: {
            properties: {
                image: {
                    type: 'number',
                },
                video: {
                    type: 'number',
                },
                document: {
                    type: 'number',
                },
                audio: {
                    type: 'number',
                },
                other: {
                    type: 'number',
                },
            },
            isRequired: true,
        },
        filesByStatus: {
            properties: {
                pending: {
                    type: 'number',
                },
                uploaded: {
                    type: 'number',
                },
                processing: {
                    type: 'number',
                },
                processed: {
                    type: 'number',
                },
                failed: {
                    type: 'number',
                },
                deleted: {
                    type: 'number',
                },
            },
            isRequired: true,
        },
        filesByProvider: {
            properties: {
                aws_s3: {
                    type: 'number',
                },
                local: {
                    type: 'number',
                },
                minio: {
                    type: 'number',
                },
            },
            isRequired: true,
        },
        storageByProvider: {
            properties: {
                aws_s3: {
                    type: 'number',
                },
                local: {
                    type: 'number',
                },
                minio: {
                    type: 'number',
                },
            },
            isRequired: true,
        },
        topUsers: {
            type: 'array',
            contains: {
                properties: {
                    userId: {
                        type: 'string',
                        isRequired: true,
                        format: 'uuid',
                    },
                    userName: {
                        type: 'string',
                        isRequired: true,
                    },
                    fileCount: {
                        type: 'number',
                        isRequired: true,
                    },
                    totalSize: {
                        type: 'number',
                        isRequired: true,
                    },
                },
            },
            isRequired: true,
        },
    },
} as const;
