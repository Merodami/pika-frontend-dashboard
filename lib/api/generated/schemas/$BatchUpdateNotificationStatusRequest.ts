/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BatchUpdateNotificationStatusRequest = {
    description: `Batch update notification statuses`,
    properties: {
        updates: {
            type: 'array',
            contains: {
                properties: {
                    messageId: {
                        type: 'string',
                        isRequired: true,
                    },
                    status: {
                        type: 'Enum',
                        isRequired: true,
                    },
                    timestamp: {
                        type: 'string',
                        description: `ISO 8601 datetime with timezone`,
                        isRequired: true,
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
            },
            isRequired: true,
        },
    },
} as const;
