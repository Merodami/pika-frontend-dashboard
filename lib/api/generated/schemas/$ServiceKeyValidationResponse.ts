/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ServiceKeyValidationResponse = {
    description: `Service key validation result`,
    properties: {
        valid: {
            type: 'boolean',
            isRequired: true,
        },
        serviceName: {
            type: 'string',
        },
        permissions: {
            type: 'array',
            contains: {
                type: 'string',
            },
        },
        rateLimit: {
            properties: {
                limit: {
                    type: 'number',
                    isRequired: true,
                },
                remaining: {
                    type: 'number',
                    isRequired: true,
                },
                resetAt: {
                    type: 'string',
                    description: `ISO 8601 datetime with timezone`,
                    isRequired: true,
                    format: 'date-time',
                },
            },
        },
    },
} as const;
