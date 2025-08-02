/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UpdateVoucherBookRequest = {
    description: `Update voucher book information`,
    properties: {
        title: {
            type: 'string',
            description: `Voucher book title`,
            maxLength: 255,
            minLength: 1,
        },
        edition: {
            type: 'string',
            description: `Book edition (e.g., "January 2024")`,
            maxLength: 100,
        },
        bookType: {
            type: 'Enum',
        },
        month: {
            type: 'number',
            description: `Month for monthly books (1-12)`,
            maximum: 12,
            minimum: 1,
        },
        year: {
            type: 'number',
            description: `Year of publication`,
            maximum: 2100,
            minimum: 2020,
        },
        totalPages: {
            type: 'number',
            description: `Total number of pages`,
            maximum: 100,
            minimum: 1,
        },
        coverImageUrl: {
            type: 'string',
            description: `URL of the cover image`,
            format: 'uri',
        },
        backImageUrl: {
            type: 'string',
            description: `URL of the back cover image`,
            format: 'uri',
        },
        metadata: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
        },
    },
} as const;
