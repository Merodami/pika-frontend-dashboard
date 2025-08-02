/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SendSMSResponse = {
    description: `SMS send result`,
    properties: {
        messageId: {
            type: 'string',
            isRequired: true,
        },
        status: {
            type: 'Enum',
            isRequired: true,
        },
        errorMessage: {
            type: 'string',
        },
    },
} as const;
