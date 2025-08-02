/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $VoucherScanRequest = {
    description: `Request to track voucher scan`,
    properties: {
        scanSource: {
            type: 'Enum',
        },
        location: {
            properties: {
                latitude: {
                    type: 'number',
                    isRequired: true,
                    maximum: 90,
                    minimum: -90,
                },
                longitude: {
                    type: 'number',
                    isRequired: true,
                    maximum: 180,
                    minimum: -180,
                },
            },
        },
        deviceInfo: {
            properties: {
                platform: {
                    type: 'string',
                    isRequired: true,
                    maxLength: 50,
                    minLength: 1,
                },
                version: {
                    type: 'string',
                    isRequired: true,
                    maxLength: 20,
                    minLength: 1,
                },
                model: {
                    type: 'string',
                    maxLength: 100,
                    minLength: 1,
                },
            },
        },
    },
} as const;
