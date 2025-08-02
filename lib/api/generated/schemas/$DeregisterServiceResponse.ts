/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $DeregisterServiceResponse = {
    description: `Service deregistration confirmation`,
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
        deregisteredAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            isRequired: true,
            format: 'date-time',
        },
        gracefulShutdown: {
            type: 'boolean',
            isRequired: true,
        },
        message: {
            type: 'string',
        },
    },
} as const;
