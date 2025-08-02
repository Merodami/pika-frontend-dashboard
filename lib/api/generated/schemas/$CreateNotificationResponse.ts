/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateNotificationResponse = {
    description: `Create notification result`,
    properties: {
        id: {
            type: 'string',
            isRequired: true,
        },
        userId: {
            type: 'string',
            isRequired: true,
        },
        title: {
            type: 'string',
            isRequired: true,
        },
        description: {
            type: 'string',
            isRequired: true,
        },
        type: {
            type: 'string',
            isRequired: true,
        },
        isRead: {
            type: 'boolean',
            isRequired: true,
        },
        isGlobal: {
            type: 'boolean',
        },
        metadata: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
        },
        createdAt: {
            type: 'string',
            isRequired: true,
        },
        updatedAt: {
            type: 'string',
        },
    },
} as const;
