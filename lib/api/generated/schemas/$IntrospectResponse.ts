/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $IntrospectResponse = {
    description: `Token introspection response`,
    properties: {
        active: {
            type: 'boolean',
            description: `Whether token is active`,
            isRequired: true,
        },
        scope: {
            type: 'string',
            description: `Token scopes`,
        },
        username: {
            type: 'string',
            description: `User email`,
            format: 'email',
            minLength: 1,
        },
        tokenType: {
            type: 'Enum',
        },
        exp: {
            type: 'number',
            description: `Expiration time (Unix timestamp)`,
        },
        iat: {
            type: 'number',
            description: `Issued at (Unix timestamp)`,
        },
        sub: {
            type: 'string',
            description: `Subject (user ID)`,
            format: 'uuid',
        },
        userId: {
            type: 'string',
            description: `User ID`,
            format: 'uuid',
        },
        userEmail: {
            type: 'string',
            description: `User email`,
            format: 'email',
            minLength: 1,
        },
        userRole: {
            type: 'Enum',
        },
    },
} as const;
