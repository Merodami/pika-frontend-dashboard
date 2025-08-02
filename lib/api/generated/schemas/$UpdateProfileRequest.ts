/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UpdateProfileRequest = {
    description: `Fields that can be updated by the user`,
    properties: {
        firstName: {
            type: 'string',
            maxLength: 50,
        },
        lastName: {
            type: 'string',
            maxLength: 50,
        },
        displayName: {
            type: 'string',
            maxLength: 100,
        },
        phoneNumber: {
            type: 'string',
            description: `Phone number in E.164 format`,
            pattern: '^\\+[1-9]\\d{1,14}$',
        },
        bio: {
            type: 'string',
            maxLength: 500,
        },
        dateOfBirth: {
            type: 'string',
            description: `Date in YYYY-MM-DD format`,
            pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
        preferredLanguage: {
            type: 'string',
            maxLength: 2,
            minLength: 2,
            pattern: '^[a-z]{2}$',
        },
    },
} as const;
