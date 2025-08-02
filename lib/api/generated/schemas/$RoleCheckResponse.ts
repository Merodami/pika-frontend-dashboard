/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $RoleCheckResponse = {
    description: `Role check result`,
    properties: {
        hasRole: {
            type: 'boolean',
            isRequired: true,
        },
        userRoles: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
        missingRoles: {
            type: 'array',
            contains: {
                type: 'string',
            },
        },
    },
} as const;
