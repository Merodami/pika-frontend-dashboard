/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ValidateServiceKeyRequest = {
    description: `Validate service API key`,
    properties: {
        apiKey: {
            type: 'string',
            isRequired: true,
        },
        serviceName: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
