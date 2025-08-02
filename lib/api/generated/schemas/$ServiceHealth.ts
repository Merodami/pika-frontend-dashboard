/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ServiceHealth = {
    properties: {
        status: {
            type: 'Enum',
            isRequired: true,
        },
        url: {
            type: 'string',
            description: `Service URL`,
            isRequired: true,
        },
        responseTime: {
            type: 'number',
            description: `Response time in milliseconds`,
            isRequired: true,
        },
    },
} as const;
