/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserCommunicationPreferencesResponse = {
    description: `User communication preferences`,
    properties: {
        userId: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        email: {
            properties: {
                enabled: {
                    type: 'boolean',
                    isRequired: true,
                },
                categories: {
                    type: 'dictionary',
                    contains: {
                        type: 'boolean',
                    },
                    isRequired: true,
                },
            },
            isRequired: true,
        },
        push: {
            properties: {
                enabled: {
                    type: 'boolean',
                    isRequired: true,
                },
                categories: {
                    type: 'dictionary',
                    contains: {
                        type: 'boolean',
                    },
                    isRequired: true,
                },
                tokens: {
                    type: 'array',
                    contains: {
                        properties: {
                            token: {
                                type: 'string',
                                isRequired: true,
                            },
                            platform: {
                                type: 'Enum',
                                isRequired: true,
                            },
                            active: {
                                type: 'boolean',
                                isRequired: true,
                            },
                        },
                    },
                    isRequired: true,
                },
            },
            isRequired: true,
        },
        sms: {
            properties: {
                enabled: {
                    type: 'boolean',
                    isRequired: true,
                },
                categories: {
                    type: 'dictionary',
                    contains: {
                        type: 'boolean',
                    },
                    isRequired: true,
                },
                phoneNumber: {
                    type: 'string',
                },
            },
            isRequired: true,
        },
        quietHours: {
            properties: {
                enabled: {
                    type: 'boolean',
                    isRequired: true,
                },
                start: {
                    type: 'string',
                    isRequired: true,
                },
                end: {
                    type: 'string',
                    isRequired: true,
                },
                timezone: {
                    type: 'string',
                    isRequired: true,
                },
            },
        },
        unsubscribedAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
    },
} as const;
