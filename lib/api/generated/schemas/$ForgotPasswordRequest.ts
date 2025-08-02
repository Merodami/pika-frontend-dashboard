/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ForgotPasswordRequest = {
    description: `Request password reset email`,
    properties: {
        email: {
            type: 'string',
            isRequired: true,
            format: 'email',
            minLength: 1,
        },
    },
} as const;
