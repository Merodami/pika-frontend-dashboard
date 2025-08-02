/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GeneratePdfRequest = {
    description: `Generate PDF for voucher book`,
    properties: {
        force: {
            type: 'boolean',
            description: `Force regeneration even if PDF already exists`,
        },
        priority: {
            type: 'Enum',
        },
    },
} as const;
