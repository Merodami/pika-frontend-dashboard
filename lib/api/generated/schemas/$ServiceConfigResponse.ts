/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ServiceConfigResponse = {
    description: `Service configuration data`,
    properties: {
        serviceName: {
            type: 'string',
            isRequired: true,
        },
        environment: {
            type: 'Enum',
            isRequired: true,
        },
        configuration: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
            isRequired: true,
        },
        lastUpdated: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            isRequired: true,
            format: 'date-time',
        },
        version: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
