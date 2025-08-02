/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BulkVoucherOperationResponse = {
    properties: {
        successful: {
            type: 'number',
            description: `Number of successful operations`,
            isRequired: true,
        },
        failed: {
            type: 'number',
            description: `Number of failed operations`,
            isRequired: true,
        },
        errors: {
            type: 'array',
            contains: {
                properties: {
                    voucherId: {
                        type: 'string',
                        description: `Universally Unique Identifier`,
                        isRequired: true,
                        format: 'uuid',
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
