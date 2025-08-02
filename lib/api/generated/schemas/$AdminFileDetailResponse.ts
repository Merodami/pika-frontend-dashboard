/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AdminFileDetailResponse = {
    description: `Admin file details with user information`,
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
        userName: {
            type: 'string',
        },
        userEmail: {
            type: 'string',
            format: 'email',
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
        uploadedAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        deletedAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        metadata: {
            type: 'dictionary',
            contains: {
                type: 'string',
            },
        },
        error: {
            type: 'string',
        },
        isPublic: {
            type: 'boolean',
        },
        downloadCount: {
            type: 'number',
        },
        lastAccessedAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        createdAt: {
            type: 'string',
            description: `When the record was created`,
            isRequired: true,
            format: 'date-time',
        },
        updatedAt: {
            type: 'string',
            description: `When the record was last updated`,
            isRequired: true,
            format: 'date-time',
        },
    },
} as const;
