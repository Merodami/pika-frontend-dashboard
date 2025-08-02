/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateBusinessRequest = {
    description: `Create a new business`,
    properties: {
        userId: {
            type: 'string',
            description: `User who will own this business`,
            isRequired: true,
            format: 'uuid',
        },
        businessName: {
            type: 'string',
            description: `Business name`,
            isRequired: true,
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
            isRequired: true,
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
