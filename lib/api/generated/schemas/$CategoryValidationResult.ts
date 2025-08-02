/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CategoryValidationResult = {
    properties: {
        categoryId: {
            type: 'string',
            description: `Universally Unique Identifier`,
            isRequired: true,
            format: 'uuid',
        },
        exists: {
            type: 'boolean',
            isRequired: true,
        },
        isActive: {
            type: 'boolean',
            isRequired: true,
        },
        valid: {
            type: 'boolean',
            isRequired: true,
        },
    },
} as const;
