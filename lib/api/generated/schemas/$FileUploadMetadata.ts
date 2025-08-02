/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FileUploadMetadata = {
    description: `Optional metadata for file upload`,
    properties: {
        category: {
            type: 'string',
        },
        description: {
            type: 'string',
            maxLength: 500,
        },
        tags: {
            type: 'array',
            contains: {
                type: 'string',
            },
        },
        isPublic: {
            type: 'boolean',
        },
    },
} as const;
