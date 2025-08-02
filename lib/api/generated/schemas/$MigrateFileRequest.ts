/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $MigrateFileRequest = {
    description: `Migrate file between storage providers`,
    properties: {
        fileId: {
            type: 'string',
            description: `Universally Unique Identifier`,
            isRequired: true,
            format: 'uuid',
        },
        targetProvider: {
            type: 'Enum',
            isRequired: true,
        },
        targetBucket: {
            type: 'string',
        },
        targetRegion: {
            type: 'string',
        },
        deleteOriginal: {
            type: 'boolean',
        },
    },
} as const;
