/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BulkVoucherBookOperationResponse = {
    description: `Bulk operation results`,
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
        results: {
            type: 'array',
            contains: {
                properties: {
                    bookId: {
                        type: 'string',
                        description: `Voucher book ID`,
                        isRequired: true,
                        format: 'uuid',
                    },
                    success: {
                        type: 'boolean',
                        description: `Whether operation succeeded`,
                        isRequired: true,
                    },
                    error: {
                        type: 'string',
                        description: `Error message if failed`,
                    },
                },
            },
            isRequired: true,
        },
    },
} as const;
