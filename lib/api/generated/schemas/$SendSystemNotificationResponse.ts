/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SendSystemNotificationResponse = {
    description: `System notification result`,
    properties: {
        notificationId: {
            type: 'string',
            description: `Universally Unique Identifier`,
            isRequired: true,
            format: 'uuid',
        },
        recipientCount: {
            type: 'number',
            isRequired: true,
        },
        channels: {
            type: 'dictionary',
            contains: {
                properties: {
                    sent: {
                        type: 'number',
                        isRequired: true,
                    },
                    failed: {
                        type: 'number',
                        isRequired: true,
                    },
                },
            },
            isRequired: true,
        },
        timestamp: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            isRequired: true,
            format: 'date-time',
        },
    },
} as const;
