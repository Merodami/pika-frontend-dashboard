/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PatchBusinessVerificationRequest = {
    description: `Update business verification status via PATCH`,
    properties: {
        verified: {
            type: 'boolean',
            description: `New verification status`,
            isRequired: true,
        },
    },
} as const;
