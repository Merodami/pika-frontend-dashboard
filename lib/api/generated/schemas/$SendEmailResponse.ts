/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SendEmailResponse = {
    description: `Send email result with communication log details`,
    properties: {
        id: {
            type: 'string',
            isRequired: true,
        },
        status: {
            type: 'string',
            isRequired: true,
        },
        type: {
            type: 'string',
        },
        recipient: {
            type: 'string',
        },
        userId: {
            type: 'string',
        },
        subject: {
            type: 'string',
        },
        templateId: {
            type: 'string',
        },
        createdAt: {
            type: 'string',
        },
        sentAt: {
            type: 'string',
        },
    },
} as const;
