/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateCategoryRequest = {
    description: `Create a new category`,
    properties: {
        nameKey: {
            type: 'string',
            description: `Translation key for category name`,
            isRequired: true,
            maxLength: 255,
            minLength: 1,
        },
        descriptionKey: {
            type: 'string',
            description: `Translation key for category description`,
            maxLength: 255,
        },
        icon: {
            type: 'string',
            description: `Category icon identifier`,
            maxLength: 255,
        },
        parentId: {
            type: 'string',
            description: `Parent category ID`,
            format: 'uuid',
        },
        isActive: {
            type: 'boolean',
            description: `Whether category is active`,
        },
        sortOrder: {
            type: 'number',
            description: `Sort order for display`,
        },
    },
} as const;
