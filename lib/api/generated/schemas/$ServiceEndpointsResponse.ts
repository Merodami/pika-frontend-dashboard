/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ServiceEndpointsResponse = {
    description: `Available endpoints for a service`,
    properties: {
        serviceName: {
            type: 'string',
            isRequired: true,
        },
        instances: {
            type: 'array',
            contains: {
                properties: {
                    instanceId: {
                        type: 'string',
                        isRequired: true,
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
                    status: {
                        type: 'Enum',
                        isRequired: true,
                    },
                    lastSeen: {
                        type: 'string',
                        description: `ISO 8601 datetime with timezone`,
                        isRequired: true,
                        format: 'date-time',
                    },
                    loadBalanceWeight: {
                        type: 'number',
                        maximum: 100,
                    },
                },
            },
            isRequired: true,
        },
        loadBalancingStrategy: {
            type: 'Enum',
        },
    },
} as const;
