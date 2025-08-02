/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $VoucherRedeemRequest = {
    description: `Request to redeem voucher`,
    properties: {
        code: {
            type: 'string',
            isRequired: true,
        },
        location: {
            description: `GeoJSON location data`,
            properties: {
            },
        },
    },
} as const;
