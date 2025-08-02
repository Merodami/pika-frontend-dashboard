/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $NotificationPreferencesResponse = {
    description: `User notification preferences`,
    properties: {
        email: {
            properties: {
                enabled: {
                    type: 'boolean',
                },
                categories: {
                    type: 'array',
                    contains: {
                        type: 'string',
                    },
                },
            },
            isRequired: true,
        },
        inApp: {
            properties: {
                enabled: {
                    type: 'boolean',
                },
                categories: {
                    type: 'array',
                    contains: {
                        type: 'string',
                    },
                },
            },
            isRequired: true,
        },
        sms: {
            properties: {
                enabled: {
                    type: 'boolean',
                },
                categories: {
                    type: 'array',
                    contains: {
                        type: 'string',
                    },
                },
            },
            isRequired: true,
        },
        push: {
            properties: {
                enabled: {
                    type: 'boolean',
                },
                categories: {
                    type: 'array',
                    contains: {
                        type: 'string',
                    },
                },
                token: {
                    type: 'string',
                },
            },
            isRequired: true,
        },
        quietHours: {
            properties: {
                enabled: {
                    type: 'boolean',
                },
                start: {
                    type: 'string',
                    pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$',
                },
                end: {
                    type: 'string',
                    pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$',
                },
                timezone: {
                    type: 'string',
                },
            },
            isRequired: true,
        },
    },
} as const;
