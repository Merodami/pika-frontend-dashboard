/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CheckUserPermissionResponse = {
    description: `Permission check result`,
    properties: {
        allowed: {
            type: 'boolean',
            isRequired: true,
        },
        reason: {
            type: 'string',
        },
    },
} as const;
