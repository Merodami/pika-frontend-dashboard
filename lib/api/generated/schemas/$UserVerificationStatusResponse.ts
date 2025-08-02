/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserVerificationStatusResponse = {
    description: `User verification status information`,
    properties: {
        userId: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        emailVerified: {
            type: 'boolean',
            isRequired: true,
        },
        phoneVerified: {
            type: 'boolean',
            isRequired: true,
        },
        verificationDate: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
    },
} as const;
