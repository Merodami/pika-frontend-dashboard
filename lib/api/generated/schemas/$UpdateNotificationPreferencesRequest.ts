/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UpdateNotificationPreferencesRequest = {
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
        },
    },
} as const;
