/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UpdateBusinessRequest = {
    description: `Update business information`,
    properties: {
        businessName: {
            type: 'string',
            description: `Business name`,
            maxLength: 255,
            minLength: 1,
        },
        businessDescription: {
            type: 'string',
            description: `Business description`,
            maxLength: 65535,
        },
        categoryId: {
            type: 'string',
            description: `Category this business belongs to`,
            format: 'uuid',
        },
        verified: {
            type: 'boolean',
            description: `Whether business is verified`,
        },
        active: {
            type: 'boolean',
            description: `Whether business is active`,
        },
    },
} as const;
