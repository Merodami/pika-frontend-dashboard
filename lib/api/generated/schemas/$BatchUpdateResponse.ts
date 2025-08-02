/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BatchUpdateResponse = {
    description: `Batch update result`,
    properties: {
        processed: {
            type: 'number',
            isRequired: true,
        },
        failed: {
            type: 'number',
            isRequired: true,
        },
        errors: {
            type: 'array',
            contains: {
                properties: {
                    messageId: {
                        type: 'string',
                        isRequired: true,
                    },
                    error: {
                        type: 'string',
                        isRequired: true,
                    },
                },
            },
        },
    },
} as const;
