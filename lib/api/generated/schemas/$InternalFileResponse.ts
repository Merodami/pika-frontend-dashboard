/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $InternalFileResponse = {
    description: `Internal file response`,
    properties: {
        id: {
            type: 'string',
            description: `Universally Unique Identifier`,
            isRequired: true,
            format: 'uuid',
        },
        userId: {
            type: 'string',
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
        bucketName: {
            type: 'string',
        },
        region: {
            type: 'string',
        },
        isPublic: {
            type: 'boolean',
            isRequired: true,
        },
        metadata: {
            type: 'dictionary',
            contains: {
                type: 'string',
            },
        },
        uploadedAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        createdAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            isRequired: true,
            format: 'date-time',
        },
        updatedAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            isRequired: true,
            format: 'date-time',
        },
    },
} as const;
