/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserFileSummaryResponse = {
    description: `User file summary for internal use`,
    properties: {
        userId: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
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
        oldestFile: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        newestFile: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
    },
} as const;
