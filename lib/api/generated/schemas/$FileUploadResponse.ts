/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FileUploadResponse = {
    description: `Response after successful file upload`,
    properties: {
        id: {
            type: 'string',
            description: `Storage log ID`,
            isRequired: true,
            format: 'uuid',
        },
        fileId: {
            type: 'string',
            description: `Universally Unique Identifier`,
            isRequired: true,
            format: 'uuid',
        },
        fileKey: {
            type: 'string',
            isRequired: true,
        },
        fileName: {
            type: 'string',
            isRequired: true,
        },
        fileSize: {
            type: 'number',
            isRequired: true,
        },
        mimeType: {
            type: 'string',
            isRequired: true,
        },
        fileType: {
            type: 'Enum',
            isRequired: true,
        },
        status: {
            type: 'Enum',
            isRequired: true,
        },
        provider: {
            type: 'Enum',
            isRequired: true,
        },
        url: {
            type: 'string',
            description: `Presigned URL if applicable`,
            format: 'uri',
        },
        uploadedAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            isRequired: true,
            format: 'date-time',
        },
        metadata: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
        },
    },
} as const;
