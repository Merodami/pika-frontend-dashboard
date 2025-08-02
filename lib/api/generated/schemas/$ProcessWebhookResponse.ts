/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ProcessWebhookResponse = {
    description: `Webhook processing result`,
    properties: {
        processed: {
            type: 'boolean',
            isRequired: true,
        },
        subscriptionId: {
            type: 'string',
            description: `Universally Unique Identifier`,
            format: 'uuid',
        },
        action: {
            type: 'string',
        },
    },
} as const;
