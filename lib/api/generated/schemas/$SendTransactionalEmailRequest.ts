/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SendTransactionalEmailRequest = {
    description: `Send transactional email`,
    properties: {
        userId: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        templateKey: {
            type: 'Enum',
            isRequired: true,
        },
        variables: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
            isRequired: true,
        },
        subject: {
            type: 'string',
            description: `Override template subject`,
        },
        replyTo: {
            type: 'string',
            format: 'email',
            minLength: 1,
        },
        attachments: {
            type: 'array',
            contains: {
                properties: {
                    filename: {
                        type: 'string',
                        isRequired: true,
                    },
                    content: {
                        type: 'string',
                        description: `Base64 encoded`,
                        isRequired: true,
                    },
                    contentType: {
                        type: 'string',
                        isRequired: true,
                    },
                },
            },
        },
        sendAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        trackOpens: {
            type: 'boolean',
        },
        trackClicks: {
            type: 'boolean',
        },
    },
} as const;
