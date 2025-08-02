/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CheckUserQuotaRequest = {
    description: `Check if user can upload file within quota`,
    properties: {
        userId: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        fileSize: {
            type: 'number',
            isRequired: true,
        },
        fileType: {
            type: 'Enum',
        },
    },
} as const;
