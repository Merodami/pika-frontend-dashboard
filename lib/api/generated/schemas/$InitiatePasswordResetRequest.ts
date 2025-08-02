/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $InitiatePasswordResetRequest = {
    description: `Initiate password reset`,
    properties: {
        email: {
            type: 'string',
            isRequired: true,
            format: 'email',
            minLength: 1,
        },
        callbackUrl: {
            type: 'string',
            format: 'uri',
        },
    },
} as const;
