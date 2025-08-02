/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AddressResponse = {
    description: `Single address details`,
    properties: {
        id: {
            type: 'string',
            description: `Universally Unique Identifier`,
            isRequired: true,
            format: 'uuid',
        },
        userId: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        street: {
            type: 'string',
            isRequired: true,
            maxLength: 255,
            minLength: 1,
        },
        street2: {
            type: 'string',
            description: `Apartment, suite, etc.`,
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
            description: `State or province`,
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
        type: {
            type: 'Enum',
            isRequired: true,
        },
        label: {
            type: 'string',
            description: `Custom label`,
            maxLength: 100,
        },
        isDefault: {
            type: 'boolean',
        },
        isPrimary: {
            type: 'boolean',
        },
        isVerified: {
            type: 'boolean',
        },
        verifiedAt: {
            type: 'string',
            format: 'date-time',
        },
        instructions: {
            type: 'string',
            description: `Delivery instructions`,
            maxLength: 500,
        },
        accessCode: {
            type: 'string',
            maxLength: 50,
        },
        createdAt: {
            type: 'string',
            description: `When the record was created`,
            isRequired: true,
            format: 'date-time',
        },
        updatedAt: {
            type: 'string',
            description: `When the record was last updated`,
            isRequired: true,
            format: 'date-time',
        },
    },
} as const;
