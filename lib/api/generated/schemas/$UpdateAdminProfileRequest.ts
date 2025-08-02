/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UpdateAdminProfileRequest = {
    description: `Update current admin user profile`,
    properties: {
        firstName: {
            type: 'string',
            maxLength: 50,
            minLength: 1,
        },
        lastName: {
            type: 'string',
            maxLength: 50,
            minLength: 1,
        },
        phoneNumber: {
            type: 'string',
        },
        dateOfBirth: {
            type: 'string',
            description: `Date in YYYY-MM-DD format`,
            pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
        avatarUrl: {
            type: 'string',
            format: 'uri',
        },
    },
} as const;
