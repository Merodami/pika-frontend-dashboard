/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BulkEmailRequest = {
    description: `Send bulk emails request`,
    properties: {
        templateId: {
            type: 'string',
            isRequired: true,
        },
        recipients: {
            type: 'array',
            contains: {
                properties: {
                    to: {
                        type: 'string',
                        isRequired: true,
                        format: 'email',
                        minLength: 1,
                    },
                    variables: {
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
