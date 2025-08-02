/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateNotificationRequest = {
    description: `Create a new notification`,
    properties: {
        userId: {
            type: 'string',
            format: 'uuid',
        },
        subToken: {
            type: 'string',
            description: `Subscription token for push notifications`,
        },
        type: {
            type: 'Enum',
        },
        title: {
            type: 'string',
            maxLength: 255,
        },
        description: {
            type: 'string',
            isRequired: true,
        },
        isGlobal: {
            type: 'boolean',
        },
        priority: {
            type: 'Enum',
        },
        category: {
            type: 'string',
        },
        actionUrl: {
            type: 'string',
            format: 'uri',
        },
        imageUrl: {
            type: 'string',
            format: 'uri',
        },
        metadata: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
        },
        expiresAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
    },
} as const;
