/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GetUserFilesRequest = {
    description: `Get files for a specific user`,
    properties: {
        userId: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        fileType: {
            type: 'Enum',
        },
        status: {
            type: 'Enum',
        },
        limit: {
            type: 'number',
            maximum: 1000,
        },
        offset: {
            type: 'number',
        },
    },
} as const;
