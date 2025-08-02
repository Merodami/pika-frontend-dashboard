/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateVoucherBookRequest = {
    description: `Create a new voucher book`,
    properties: {
        title: {
            type: 'string',
            description: `Voucher book title`,
            isRequired: true,
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
            isRequired: true,
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
            isRequired: true,
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
