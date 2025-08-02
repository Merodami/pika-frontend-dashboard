/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateMyBusinessRequest = {
    description: `Create business data for business owners`,
    properties: {
        businessName: {
            type: 'string',
            description: `Business name`,
            isRequired: true,
            maxLength: 100,
            minLength: 1,
        },
        businessDescription: {
            type: 'string',
            description: `Business description`,
            maxLength: 500,
        },
        categoryId: {
            type: 'string',
            description: `Category ID`,
            isRequired: true,
            format: 'uuid',
        },
    },
} as const;
