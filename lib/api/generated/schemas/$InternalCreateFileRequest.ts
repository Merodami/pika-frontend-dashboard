/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $InternalCreateFileRequest = {
    description: `Internal file creation request`,
    properties: {
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
        },
        metadata: {
            type: 'dictionary',
            contains: {
                type: 'string',
            },
        },
    },
} as const;
