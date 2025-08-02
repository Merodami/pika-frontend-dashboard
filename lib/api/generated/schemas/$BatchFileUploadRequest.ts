/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BatchFileUploadRequest = {
    description: `Batch file upload request body`,
    properties: {
        folder: {
            type: 'string',
            description: `Target folder for uploads`,
        },
        isPublic: {
            type: 'string',
            description: `Whether files should be publicly accessible`,
        },
    },
} as const;
