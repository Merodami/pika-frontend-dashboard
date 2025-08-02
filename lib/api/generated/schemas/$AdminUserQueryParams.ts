/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AdminUserQueryParams = {
    properties: {
        search: {
            type: 'string',
            description: `Search in name, email, phone`,
        },
        email: {
            type: 'string',
            format: 'email',
            minLength: 1,
        },
        status: {
            type: 'Enum',
        },
        role: {
            type: 'Enum',
        },
        emailVerified: {
            type: 'boolean',
        },
        phoneVerified: {
            type: 'boolean',
        },
        registeredFrom: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        registeredTo: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        lastLoginFrom: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        lastLoginTo: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        minSpent: {
            type: 'number',
        },
        maxSpent: {
            type: 'number',
        },
        hasReports: {
            type: 'boolean',
        },
        page: {
            type: 'number',
        },
        limit: {
            type: 'number',
            maximum: 100,
        },
        sortBy: {
            type: 'Enum',
        },
        sortOrder: {
            type: 'Enum',
        },
    },
} as const;
