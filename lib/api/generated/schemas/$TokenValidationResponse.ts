/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $TokenValidationResponse = {
    description: `Token validation result`,
    properties: {
        valid: {
            type: 'boolean',
            isRequired: true,
        },
        userId: {
            type: 'string',
            format: 'uuid',
        },
        email: {
            type: 'string',
            format: 'email',
            minLength: 1,
        },
        roles: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
        permissions: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
        expiresAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        metadata: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
        },
    },
} as const;
