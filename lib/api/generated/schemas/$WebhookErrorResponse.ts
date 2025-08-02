/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $WebhookErrorResponse = {
    description: `Webhook error response`,
    properties: {
        error: {
            properties: {
                code: {
                    type: 'Enum',
                    isRequired: true,
                },
                message: {
                    type: 'string',
                    isRequired: true,
                },
                eventId: {
                    type: 'string',
                },
                timestamp: {
                    type: 'string',
                    description: `ISO 8601 datetime with timezone`,
                    isRequired: true,
                    format: 'date-time',
                },
            },
            isRequired: true,
        },
    },
} as const;
