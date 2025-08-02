/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UsageProcessingResponse = {
    description: `Usage processing result`,
    properties: {
        success: {
            type: 'boolean',
            isRequired: true,
        },
        usageRecorded: {
            type: 'boolean',
            isRequired: true,
        },
        message: {
            type: 'string',
        },
    },
} as const;
