/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CheckCategoryExistsResponse = {
    description: `Category existence check result`,
    properties: {
        exists: {
            type: 'boolean',
            isRequired: true,
        },
        isActive: {
            type: 'boolean',
        },
        category: {
            description: `Internal category data for services`,
            properties: {
                id: {
                    type: 'string',
                    description: `Universally Unique Identifier`,
                    isRequired: true,
                    format: 'uuid',
                },
                nameKey: {
                    type: 'string',
                    isRequired: true,
                },
                descriptionKey: {
                    type: 'string',
                },
                icon: {
                    type: 'string',
                },
                parentId: {
                    type: 'string',
                    description: `Universally Unique Identifier`,
                    format: 'uuid',
                },
                isActive: {
                    type: 'boolean',
                    isRequired: true,
                },
                sortOrder: {
                    type: 'number',
                    isRequired: true,
                },
            },
        },
    },
} as const;
