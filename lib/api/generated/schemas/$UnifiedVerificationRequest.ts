/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UnifiedVerificationRequest = {
    properties: {
        type: {
            type: 'Enum',
            isRequired: true,
        },
        token: {
            type: 'string',
        },
        code: {
            type: 'string',
            maxLength: 6,
            minLength: 6,
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
