/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $EmailVerificationTokenResponse = {
    description: `Email verification token`,
    properties: {
        token: {
            type: 'string',
            isRequired: true,
        },
        expiresAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            isRequired: true,
            format: 'date-time',
        },
    },
} as const;
