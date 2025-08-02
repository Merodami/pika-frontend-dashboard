/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AdminCreateUserRequest = {
    description: `Create a new user (admin only)`,
    properties: {
        email: {
            type: 'string',
            isRequired: true,
            format: 'email',
            minLength: 1,
        },
        firstName: {
            type: 'string',
            isRequired: true,
            maxLength: 50,
            minLength: 1,
        },
        lastName: {
            type: 'string',
            isRequired: true,
            maxLength: 50,
            minLength: 1,
        },
        phoneNumber: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        dateOfBirth: {
            type: 'string',
            description: `Date in YYYY-MM-DD format`,
            pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
        role: {
            type: 'Enum',
        },
        status: {
            type: 'Enum',
        },
        appVersion: {
            type: 'string',
        },
        alias: {
            type: 'string',
        },
    },
} as const;
