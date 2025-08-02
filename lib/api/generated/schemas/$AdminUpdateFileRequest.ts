/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AdminUpdateFileRequest = {
    description: `Admin update file details`,
    properties: {
        fileName: {
            type: 'string',
        },
        status: {
            type: 'Enum',
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
