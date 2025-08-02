/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateUserRequest = {
    description: `Create new user for registration with full profile data`,
    properties: {
        email: {
            type: 'string',
            isRequired: true,
            format: 'email',
            minLength: 1,
        },
        passwordHash: {
            type: 'string',
            isRequired: true,
        },
        firstName: {
            type: 'string',
            isRequired: true,
        },
        lastName: {
            type: 'string',
            isRequired: true,
        },
        phoneNumber: {
            type: 'string',
        },
        dateOfBirth: {
            type: 'string',
            description: `Date string in YYYY-MM-DD format`,
            pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
        acceptTerms: {
            type: 'boolean',
            isRequired: true,
        },
        marketingConsent: {
            type: 'boolean',
        },
        role: {
            type: 'Enum',
            isRequired: true,
        },
        avatarUrl: {
            type: 'string',
            format: 'uri',
        },
    },
} as const;
