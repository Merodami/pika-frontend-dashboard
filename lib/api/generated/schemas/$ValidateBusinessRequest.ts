/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ValidateBusinessRequest = {
    description: `Validate businesses exist and optionally check if active/verified`,
    properties: {
        businessIds: {
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
        checkVerified: {
            type: 'boolean',
        },
    },
} as const;
