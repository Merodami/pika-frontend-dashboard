/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $RevokeTokenRequest = {
    description: `Token revocation request`,
    properties: {
        token: {
            type: 'string',
            description: `Token to revoke`,
            isRequired: true,
            minLength: 1,
        },
        tokenTypeHint: {
            type: 'Enum',
        },
        allDevices: {
            type: 'boolean',
            description: `Revoke all tokens for user`,
        },
    },
} as const;
