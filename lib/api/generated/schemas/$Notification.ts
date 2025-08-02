/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Notification = {
    description: `User notification`,
    properties: {
        id: {
            type: 'string',
            description: `Universally Unique Identifier`,
            isRequired: true,
            format: 'uuid',
        },
        userId: {
            type: 'string',
            description: `User ID who receives the notification`,
            format: 'uuid',
        },
        type: {
            type: 'Enum',
        },
        status: {
            type: 'Enum',
        },
        priority: {
            type: 'Enum',
        },
        title: {
            type: 'string',
            maxLength: 255,
        },
        description: {
            type: 'string',
        },
        isGlobal: {
            type: 'boolean',
            description: `Whether this is a global notification`,
        },
        isRead: {
            type: 'boolean',
            description: `Whether the notification has been read`,
        },
        readAt: {
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
        category: {
            type: 'string',
            description: `Notification category for filtering`,
        },
        actionUrl: {
            type: 'string',
            description: `URL to navigate when notification is clicked`,
            format: 'uri',
        },
        imageUrl: {
            type: 'string',
            description: `Notification image`,
            format: 'uri',
        },
        expiresAt: {
            type: 'string',
            description: `When the notification expires`,
            format: 'date-time',
        },
        createdAt: {
            type: 'string',
            description: `When the record was created`,
            isRequired: true,
            format: 'date-time',
        },
        updatedAt: {
            type: 'string',
            description: `When the record was last updated`,
            isRequired: true,
            format: 'date-time',
        },
    },
} as const;
