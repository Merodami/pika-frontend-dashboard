/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BulkVoucherBookOperationRequest = {
    description: `Bulk operation on multiple voucher books`,
    properties: {
        bookIds: {
            type: 'array',
            contains: {
                type: 'string',
                description: `Universally Unique Identifier`,
                format: 'uuid',
            },
            isRequired: true,
        },
        operation: {
            type: 'Enum',
            isRequired: true,
        },
        options: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
        },
    },
} as const;
