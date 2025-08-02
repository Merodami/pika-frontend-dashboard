/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UpdateAddressRequest = {
    description: `Update an existing address`,
    properties: {
        street: {
            type: 'string',
            maxLength: 255,
            minLength: 1,
        },
        street2: {
            type: 'string',
            maxLength: 255,
        },
        city: {
            type: 'string',
            maxLength: 100,
            minLength: 1,
        },
        state: {
            type: 'string',
            maxLength: 100,
            minLength: 1,
        },
        postalCode: {
            type: 'string',
            maxLength: 20,
            minLength: 1,
        },
        country: {
            type: 'string',
            description: `ISO 3166-1 alpha-2 country code`,
            maxLength: 2,
            minLength: 2,
        },
        type: {
            type: 'Enum',
        },
        label: {
            type: 'string',
            maxLength: 100,
        },
        isDefault: {
            type: 'boolean',
        },
        instructions: {
            type: 'string',
            maxLength: 500,
        },
        accessCode: {
            type: 'string',
            maxLength: 50,
        },
        coordinates: {
            description: `Geographic point with latitude and longitude`,
            properties: {
                lat: {
                    type: 'number',
                    description: `Latitude`,
                    isRequired: true,
                    maximum: 90,
                    minimum: -90,
                },
                lng: {
                    type: 'number',
                    description: `Longitude`,
                    isRequired: true,
                    maximum: 180,
                    minimum: -180,
                },
            },
        },
        isVerified: {
            type: 'boolean',
        },
    },
} as const;
