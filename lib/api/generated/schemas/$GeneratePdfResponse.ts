/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GeneratePdfResponse = {
    description: `PDF generation job status`,
    properties: {
        jobId: {
            type: 'string',
            description: `PDF generation job ID`,
            isRequired: true,
        },
        status: {
            type: 'Enum',
            isRequired: true,
        },
        message: {
            type: 'string',
            description: `Status message`,
            isRequired: true,
        },
        estimatedCompletion: {
            type: 'string',
            description: `Estimated completion time`,
            format: 'date-time',
        },
        pdfUrl: {
            type: 'string',
            description: `PDF URL if already completed`,
            format: 'uri',
        },
    },
} as const;
