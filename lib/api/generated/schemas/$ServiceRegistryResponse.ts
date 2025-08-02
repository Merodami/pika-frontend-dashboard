/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ServiceRegistryResponse = {
    description: `List of registered services`,
    properties: {
        services: {
            type: 'array',
            contains: {
                description: `Service instance in the registry`,
                properties: {
                    id: {
                        type: 'string',
                        description: `Universally Unique Identifier`,
                        isRequired: true,
                        format: 'uuid',
                    },
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
                    status: {
                        type: 'Enum',
                        isRequired: true,
                    },
                    lastHealthCheck: {
                        type: 'string',
                        description: `ISO 8601 datetime with timezone`,
                        format: 'date-time',
                    },
                    healthCheckUrl: {
                        type: 'string',
                        format: 'uri',
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
                    metrics: {
                        properties: {
                            cpuUsage: {
                                type: 'number',
                                maximum: 100,
                            },
                            memoryUsage: {
                                type: 'number',
                                maximum: 100,
                            },
                            diskUsage: {
                                type: 'number',
                                maximum: 100,
                            },
                            requestCount: {
                                type: 'number',
                            },
                            errorRate: {
                                type: 'number',
                                maximum: 100,
                            },
                            responseTime: {
                                type: 'number',
                            },
                        },
                    },
                    registeredBy: {
                        type: 'string',
                    },
                    lastSeen: {
                        type: 'string',
                        description: `ISO 8601 datetime with timezone`,
                        isRequired: true,
                        format: 'date-time',
                    },
                    ttl: {
                        type: 'number',
                    },
                    createdAt: {
                        type: 'string',
                        description: `When the record was created`,
                        isRequired: true,
                        format: 'date-time',
                    },
                    updatedAt: {
                        type: 'string',
                        description: `When the record was last updated`,
                        isRequired: true,
                        format: 'date-time',
                    },
                },
            },
            isRequired: true,
        },
        totalCount: {
            type: 'number',
            isRequired: true,
        },
        lastUpdated: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            isRequired: true,
            format: 'date-time',
        },
    },
} as const;
