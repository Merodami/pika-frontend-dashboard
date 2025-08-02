/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ValidateCategoryRequest = {
    description: `Validate categories exist and optionally check if active`,
    properties: {
        categoryIds: {
            type: 'array',
            contains: {
                type: 'string',
                description: `Universally Unique Identifier`,
                format: 'uuid',
            },
            isRequired: true,
        },
        checkActive: {
            type: 'boolean',
        },
    },
} as const;
