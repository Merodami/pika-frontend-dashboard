/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PublishVoucherBookRequest = {
    description: `Publish a voucher book`,
    properties: {
        publishedAt: {
            type: 'string',
            description: `Publication date (defaults to now)`,
            format: 'date-time',
        },
        generatePdf: {
            type: 'boolean',
            description: `Generate PDF during publication`,
        },
    },
} as const;
