/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SendSystemNotificationRequest = {
    description: `Send system notification`,
    properties: {
        userIds: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
        },
        broadcast: {
            type: 'boolean',
            description: `Send to all users`,
        },
        title: {
            type: 'string',
            isRequired: true,
            maxLength: 255,
        },
        message: {
            type: 'string',
            isRequired: true,
        },
        category: {
            type: 'Enum',
            isRequired: true,
        },
        priority: {
            type: 'Enum',
        },
        channels: {
            type: 'array',
            contains: {
                type: 'Enum',
            },
        },
        templateId: {
            type: 'string',
        },
        templateVariables: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
        },
        actionUrl: {
            type: 'string',
            format: 'uri',
        },
        expiresAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        metadata: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
        },
    },
} as const;
