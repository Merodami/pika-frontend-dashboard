/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $VerifyEmailRequest = {
    description: `Email verification token`,
    properties: {
        token: {
            type: 'string',
            description: `Email verification token from email link`,
            isRequired: true,
            minLength: 1,
        },
    },
} as const;
