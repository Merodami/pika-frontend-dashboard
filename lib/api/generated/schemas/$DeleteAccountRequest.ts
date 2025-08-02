/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $DeleteAccountRequest = {
    description: `Account deletion request`,
    properties: {
        password: {
            type: 'string',
            description: `Current password for verification`,
            isRequired: true,
            minLength: 1,
        },
        reason: {
            type: 'string',
            description: `Optional reason for account deletion`,
            maxLength: 500,
        },
        confirmDeletion: {
            type: 'boolean',
            description: `Must be true to confirm deletion`,
            isRequired: true,
        },
    },
} as const;
