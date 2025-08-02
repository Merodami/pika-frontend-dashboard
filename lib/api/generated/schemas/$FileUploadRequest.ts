/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FileUploadRequest = {
    description: `File upload request body (from multipart form)`,
    properties: {
        folder: {
            type: 'string',
            description: `Target folder for upload`,
        },
        isPublic: {
            type: 'string',
            description: `Whether file should be publicly accessible`,
        },
        metadata: {
            type: 'string',
            description: `JSON string of additional metadata`,
        },
    },
} as const;
