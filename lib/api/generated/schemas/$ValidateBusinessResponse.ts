/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ValidateBusinessResponse = {
    description: `Validation results for businesses`,
    properties: {
        valid: {
            type: 'array',
            contains: {
                type: 'string',
                description: `Universally Unique Identifier`,
                format: 'uuid',
            },
            isRequired: true,
        },
        invalid: {
            type: 'array',
            contains: {
                properties: {
                    id: {
                        type: 'string',
                        description: `Universally Unique Identifier`,
                        isRequired: true,
                        format: 'uuid',
                    },
                    reason: {
                        type: 'string',
                        isRequired: true,
                    },
                },
            },
            isRequired: true,
        },
    },
} as const;
