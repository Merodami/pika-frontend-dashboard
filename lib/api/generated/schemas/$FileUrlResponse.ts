/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FileUrlResponse = {
    description: `Presigned URL for file access`,
    properties: {
        url: {
            type: 'string',
            isRequired: true,
            format: 'uri',
        },
        expiresAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            isRequired: true,
            format: 'date-time',
        },
        fileId: {
            type: 'string',
            description: `Universally Unique Identifier`,
            isRequired: true,
            format: 'uuid',
        },
        fileName: {
            type: 'string',
            isRequired: true,
        },
        mimeType: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
