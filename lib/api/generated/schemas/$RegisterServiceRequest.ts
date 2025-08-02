/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $RegisterServiceRequest = {
    description: `Register a service instance`,
    properties: {
        serviceName: {
            type: 'string',
            isRequired: true,
            maxLength: 100,
            minLength: 1,
        },
        serviceType: {
            type: 'Enum',
            isRequired: true,
        },
        version: {
            type: 'string',
            isRequired: true,
            pattern: '^\\d+\\.\\d+\\.\\d+$',
        },
        instanceId: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        endpoints: {
            type: 'array',
            contains: {
                properties: {
                    protocol: {
                        type: 'Enum',
                        isRequired: true,
                    },
                    host: {
                        type: 'string',
                        isRequired: true,
                    },
                    port: {
                        type: 'number',
                        isRequired: true,
                    },
                    path: {
                        type: 'string',
                    },
                    healthCheckPath: {
                        type: 'string',
                    },
                },
            },
            isRequired: true,
        },
        environment: {
            type: 'Enum',
            isRequired: true,
        },
        region: {
            type: 'string',
        },
        availabilityZone: {
            type: 'string',
        },
        healthCheckUrl: {
            type: 'string',
            format: 'uri',
        },
        healthCheckInterval: {
            type: 'number',
        },
        metadata: {
            type: 'dictionary',
            contains: {
                type: 'string',
            },
        },
        tags: {
            type: 'array',
            contains: {
                type: 'string',
            },
        },
        ttl: {
            type: 'number',
        },
        autoDeregister: {
            type: 'boolean',
        },
    },
} as const;
