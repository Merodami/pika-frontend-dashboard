/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $RegisterRequest = {
    description: `New user registration data (avatar uploaded separately)`,
    properties: {
        email: {
            type: 'string',
            isRequired: true,
            format: 'email',
            minLength: 1,
        },
        password: {
            type: 'string',
            description: `Password must meet security requirements`,
            isRequired: true,
            maxLength: 128,
            minLength: 8,
            pattern: '[a-z]',
        },
        firstName: {
            type: 'string',
            isRequired: true,
            maxLength: 50,
            minLength: 1,
            pattern: '^[a-zA-Z\\s\\-\']+$',
        },
        lastName: {
            type: 'string',
            isRequired: true,
            maxLength: 50,
            minLength: 1,
            pattern: '^[a-zA-Z\\s\\-\']+$',
        },
        phoneNumber: {
            type: 'string',
            description: `Phone number in E.164 format`,
            pattern: '^\\+[1-9]\\d{1,14}$',
        },
        dateOfBirth: {
            type: 'string',
            description: `Date of birth in YYYY-MM-DD format`,
            pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
        acceptTerms: {
            type: 'boolean',
            description: `User must accept terms and conditions`,
            isRequired: true,
        },
        marketingConsent: {
            type: 'boolean',
            description: `User consent for marketing emails`,
        },
    },
} as const;
