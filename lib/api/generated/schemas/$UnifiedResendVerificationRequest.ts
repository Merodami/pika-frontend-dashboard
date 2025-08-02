/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UnifiedResendVerificationRequest = {
    properties: {
        type: {
            type: 'Enum',
            isRequired: true,
        },
        userId: {
            type: 'string',
            format: 'uuid',
        },
        email: {
            type: 'string',
            format: 'email',
        },
        phoneNumber: {
            type: 'string',
        },
    },
} as const;
