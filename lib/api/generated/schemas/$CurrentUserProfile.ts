/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CurrentUserProfile = {
    description: `Authenticated user's complete profile`,
    properties: {
        id: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
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
        },
        lastName: {
            type: 'string',
            isRequired: true,
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
        avatarUrl: {
            type: 'string',
            format: 'uri',
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
        role: {
            type: 'Enum',
            isRequired: true,
        },
        status: {
            type: 'Enum',
            isRequired: true,
        },
        emailVerified: {
            type: 'boolean',
            isRequired: true,
        },
        phoneVerified: {
            type: 'boolean',
        },
        createdAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            isRequired: true,
            format: 'date-time',
        },
        updatedAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            isRequired: true,
            format: 'date-time',
        },
        lastLoginAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
    },
} as const;
