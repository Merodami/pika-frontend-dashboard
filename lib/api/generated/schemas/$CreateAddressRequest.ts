/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateAddressRequest = {
    description: `Create a new address`,
    properties: {
        street: {
            type: 'string',
            isRequired: true,
            maxLength: 255,
            minLength: 1,
        },
        street2: {
            type: 'string',
            maxLength: 255,
        },
        city: {
            type: 'string',
            isRequired: true,
            maxLength: 100,
            minLength: 1,
        },
        state: {
            type: 'string',
            isRequired: true,
            maxLength: 100,
            minLength: 1,
        },
        postalCode: {
            type: 'string',
            isRequired: true,
            maxLength: 20,
            minLength: 1,
        },
        country: {
            type: 'string',
            description: `ISO 3166-1 alpha-2 country code`,
            isRequired: true,
            maxLength: 2,
            minLength: 2,
        },
        type: {
            type: 'Enum',
            isRequired: true,
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
    },
} as const;
