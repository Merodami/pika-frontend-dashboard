/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SendEmailRequest = {
    description: `Send email request`,
    properties: {
        to: {
            type: 'string',
            isRequired: true,
            format: 'email',
            minLength: 1,
        },
        subject: {
            type: 'string',
            description: `Optional when using templateId`,
        },
        templateId: {
            type: 'string',
        },
        templateParams: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
        },
        body: {
            type: 'string',
        },
        isHtml: {
            type: 'boolean',
        },
        replyTo: {
            type: 'string',
            format: 'email',
            minLength: 1,
        },
        cc: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'email',
                minLength: 1,
            },
        },
        bcc: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'email',
                minLength: 1,
            },
        },
        userId: {
            type: 'string',
            description: `User ID for tracking and logging`,
            isNullable: true,
            format: 'uuid',
        },
    },
} as const;
