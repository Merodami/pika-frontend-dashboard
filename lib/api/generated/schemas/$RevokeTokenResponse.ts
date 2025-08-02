/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $RevokeTokenResponse = {
    description: `Token revocation response`,
    properties: {
        success: {
            type: 'boolean',
        },
        message: {
            type: 'string',
        },
        revokedCount: {
            type: 'number',
            description: `Number of tokens revoked`,
        },
    },
} as const;
