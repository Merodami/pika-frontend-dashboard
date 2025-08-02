/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BulkEmailResponse = {
    description: `Bulk email result`,
    properties: {
        sent: {
            type: 'number',
            isRequired: true,
        },
        failed: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;
