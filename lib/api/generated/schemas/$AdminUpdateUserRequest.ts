/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AdminUpdateUserRequest = {
    description: `Update user information (admin)`,
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
        activeMembership: {
            type: 'boolean',
        },
        description: {
            type: 'string',
        },
        specialties: {
            type: 'array',
            contains: {
                type: 'string',
            },
        },
    },
} as const;
