/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GetVouchersByIdsRequest = {
    description: `Batch fetch vouchers by IDs`,
    properties: {
        voucherIds: {
            type: 'array',
            contains: {
                type: 'string',
                description: `Universally Unique Identifier`,
                format: 'uuid',
            },
            isRequired: true,
        },
        include: {
            type: 'string',
            description: `Comma-separated relations: business,category,codes`,
        },
    },
} as const;
