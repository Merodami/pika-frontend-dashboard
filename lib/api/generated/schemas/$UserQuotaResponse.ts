/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserQuotaResponse = {
    description: `User storage quota information`,
    properties: {
        userId: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        canUpload: {
            type: 'boolean',
            isRequired: true,
        },
        quotaExceeded: {
            type: 'boolean',
            isRequired: true,
        },
        currentUsage: {
            type: 'number',
            description: `Current usage in bytes`,
            isRequired: true,
        },
        quotaLimit: {
            type: 'number',
            description: `Quota limit in bytes`,
            isRequired: true,
        },
        remainingSpace: {
            type: 'number',
            description: `Remaining space in bytes`,
            isRequired: true,
        },
        fileCountLimit: {
            type: 'number',
        },
        currentFileCount: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;
