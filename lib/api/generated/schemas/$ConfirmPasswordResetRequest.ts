/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ConfirmPasswordResetRequest = {
    description: `Confirm password reset`,
    properties: {
        token: {
            type: 'string',
            isRequired: true,
        },
        newPassword: {
            type: 'string',
            isRequired: true,
            minLength: 8,
        },
    },
} as const;
