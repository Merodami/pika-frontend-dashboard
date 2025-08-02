/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $DeregisterServiceRequest = {
    description: `Deregister service instance`,
    properties: {
        reason: {
            type: 'Enum',
        },
        gracefulShutdown: {
            type: 'boolean',
        },
        drainConnections: {
            type: 'boolean',
        },
        drainTimeoutSeconds: {
            type: 'number',
        },
    },
} as const;
