/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SendPushNotificationResponse = {
    description: `Push notification result`,
    properties: {
        sent: {
            type: 'number',
            isRequired: true,
        },
        failed: {
            type: 'number',
            isRequired: true,
        },
        failures: {
            type: 'array',
            contains: {
                properties: {
                    userId: {
                        type: 'string',
                        isRequired: true,
                        format: 'uuid',
                    },
                    reason: {
                        type: 'string',
                        isRequired: true,
                    },
                },
            },
        },
    },
} as const;
