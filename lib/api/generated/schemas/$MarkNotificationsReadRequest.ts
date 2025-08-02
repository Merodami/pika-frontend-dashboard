/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $MarkNotificationsReadRequest = {
    description: `Mark notifications as read`,
    properties: {
        notificationIds: {
            type: 'array',
            contains: {
                type: 'string',
                description: `Universally Unique Identifier`,
                format: 'uuid',
            },
        },
        all: {
            type: 'boolean',
        },
        category: {
            type: 'string',
            description: `Mark all in category as read`,
        },
    },
} as const;
