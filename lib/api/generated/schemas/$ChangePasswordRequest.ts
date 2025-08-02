/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ChangePasswordRequest = {
    description: `Change password for authenticated user`,
    properties: {
        currentPassword: {
            type: 'string',
            description: `Current password for verification`,
            isRequired: true,
            minLength: 1,
        },
        newPassword: {
            type: 'string',
            description: `New password meeting security requirements`,
            isRequired: true,
            maxLength: 128,
            minLength: 8,
            pattern: '[a-z]',
        },
    },
} as const;
