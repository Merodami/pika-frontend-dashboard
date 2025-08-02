/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GetFileUrlQuery = {
    description: `Query parameters for getting file URL`,
    properties: {
        expiresIn: {
            type: 'number',
            description: `URL expiration time in seconds`,
            maximum: 86400,
        },
    },
} as const;
