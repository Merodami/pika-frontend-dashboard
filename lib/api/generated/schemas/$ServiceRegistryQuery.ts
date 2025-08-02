/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ServiceRegistryQuery = {
    properties: {
        serviceName: {
            type: 'string',
        },
        serviceType: {
            type: 'Enum',
        },
        environment: {
            type: 'Enum',
        },
        status: {
            type: 'Enum',
        },
        region: {
            type: 'string',
        },
        tags: {
            type: 'array',
            contains: {
                type: 'string',
            },
        },
        healthyOnly: {
            type: 'boolean',
        },
        includeMetrics: {
            type: 'boolean',
        },
    },
} as const;
