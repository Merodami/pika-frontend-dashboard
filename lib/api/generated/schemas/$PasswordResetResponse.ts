/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PasswordResetResponse = {
    description: `Password reset initiated`,
    properties: {
        resetToken: {
            type: 'string',
            isRequired: true,
        },
        expiresAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            isRequired: true,
            format: 'date-time',
        },
        emailSent: {
            type: 'boolean',
            isRequired: true,
        },
    },
} as const;
