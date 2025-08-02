/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SendPushNotificationRequest = {
    description: `Send push notification`,
    properties: {
        userIds: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isRequired: true,
        },
        title: {
            type: 'string',
            isRequired: true,
            maxLength: 100,
        },
        body: {
            type: 'string',
            isRequired: true,
            maxLength: 255,
        },
        badge: {
            type: 'number',
        },
        sound: {
            type: 'string',
        },
        data: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
        },
        subtitle: {
            type: 'string',
        },
        threadId: {
            type: 'string',
        },
        channelId: {
            type: 'string',
        },
        icon: {
            type: 'string',
        },
        color: {
            type: 'string',
        },
        priority: {
            type: 'Enum',
        },
        ttl: {
            type: 'number',
            description: `Time to live in seconds`,
        },
    },
} as const;
