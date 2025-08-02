/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ValidateTokenRequest = {
    description: `Validate JWT token`,
    properties: {
        token: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        checkExpiry: {
            type: 'boolean',
        },
        requiredRoles: {
            type: 'array',
            contains: {
                type: 'string',
            },
        },
    },
} as const;
