/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $TokenRequest = {
    type: 'one-of',
    description: `OAuth 2.0 compatible token request`,
    contains: [{
        properties: {
            grantType: {
                type: 'Enum',
                isRequired: true,
            },
            username: {
                type: 'string',
                description: `User email address`,
                isRequired: true,
                format: 'email',
                minLength: 1,
            },
            password: {
                type: 'string',
                description: `User password`,
                isRequired: true,
                minLength: 8,
            },
            scope: {
                type: 'string',
                description: `Requested permissions`,
            },
        },
    }, {
        properties: {
            grantType: {
                type: 'Enum',
                isRequired: true,
            },
            refreshToken: {
                type: 'string',
                description: `Valid refresh token`,
                isRequired: true,
                minLength: 1,
            },
            scope: {
                type: 'string',
                description: `Requested permissions (subset of original)`,
            },
        },
    }],
} as const;
