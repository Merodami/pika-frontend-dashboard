/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AuthTokensResponse = {
    description: `Authentication token pair`,
    properties: {
        accessToken: {
            type: 'string',
            description: `JWT access token`,
            isRequired: true,
            minLength: 1,
        },
        refreshToken: {
            type: 'string',
            description: `JWT refresh token`,
            isRequired: true,
            minLength: 1,
        },
        tokenType: {
            type: 'Enum',
        },
        expiresIn: {
            type: 'number',
            description: `Access token expiration in seconds`,
            isRequired: true,
        },
    },
} as const;
