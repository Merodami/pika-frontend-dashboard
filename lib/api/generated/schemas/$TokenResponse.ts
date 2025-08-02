/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $TokenResponse = {
    description: `OAuth 2.0 compatible token response`,
    properties: {
        accessToken: {
            type: 'string',
            description: `JWT access token`,
            isRequired: true,
            minLength: 1,
        },
        tokenType: {
            type: 'Enum',
            isRequired: true,
        },
        expiresIn: {
            type: 'number',
            description: `Token lifetime in seconds`,
            isRequired: true,
        },
        refreshToken: {
            type: 'string',
            description: `JWT refresh token`,
            minLength: 1,
        },
        scope: {
            type: 'string',
            description: `Granted permissions`,
        },
        user: {
            description: `User information for password grant`,
            properties: {
                id: {
                    type: 'string',
                    isRequired: true,
                    format: 'uuid',
                },
                email: {
                    type: 'string',
                    isRequired: true,
                    format: 'email',
                    minLength: 1,
                },
                firstName: {
                    type: 'string',
                    isRequired: true,
                },
                lastName: {
                    type: 'string',
                    isRequired: true,
                },
                profilePicture: {
                    type: 'string',
                    format: 'uri',
                },
                role: {
                    type: 'Enum',
                    isRequired: true,
                },
            },
        },
    },
} as const;
