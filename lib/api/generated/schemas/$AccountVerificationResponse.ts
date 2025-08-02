/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AccountVerificationResponse = {
    description: `Account verification result`,
    properties: {
        verified: {
            type: 'boolean',
            isRequired: true,
        },
        userId: {
            type: 'string',
            format: 'uuid',
        },
        message: {
            type: 'string',
        },
    },
} as const;
