/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $RegisterServiceResponse = {
    description: `Service registration confirmation`,
    properties: {
        instanceId: {
            type: 'string',
            description: `Universally Unique Identifier`,
            isRequired: true,
            format: 'uuid',
        },
        serviceName: {
            type: 'string',
            isRequired: true,
        },
        registeredAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            isRequired: true,
            format: 'date-time',
        },
        expiresAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            isRequired: true,
            format: 'date-time',
        },
        healthCheckUrl: {
            type: 'string',
            format: 'uri',
        },
    },
} as const;
