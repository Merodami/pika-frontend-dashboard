/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $InternalUserData = {
    description: `Internal user data for services`,
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
        },
        lastName: {
            type: 'string',
            isRequired: true,
        },
        phoneNumber: {
            type: 'string',
        },
        isActive: {
            type: 'boolean',
            isRequired: true,
        },
        isVerified: {
            type: 'boolean',
            isRequired: true,
        },
        role: {
            type: 'Enum',
            isRequired: true,
        },
        createdAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            isRequired: true,
            format: 'date-time',
        },
        canMakePayments: {
            type: 'boolean',
        },
        canBookSessions: {
            type: 'boolean',
        },
        hasValidSubscription: {
            type: 'boolean',
        },
        stripeCustomerId: {
            type: 'string',
        },
        language: {
            type: 'string',
            maxLength: 2,
            minLength: 2,
        },
        timezone: {
            type: 'string',
        },
        notificationPreferences: {
            properties: {
                email: {
                    type: 'boolean',
                },
                push: {
                    type: 'boolean',
                },
                sms: {
                    type: 'boolean',
                },
            },
            isRequired: true,
        },
    },
} as const;
