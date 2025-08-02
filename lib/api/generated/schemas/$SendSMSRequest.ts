/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SendSMSRequest = {
    description: `Send SMS message`,
    properties: {
        userId: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        phoneNumber: {
            type: 'string',
            description: `Override user phone`,
        },
        message: {
            type: 'string',
            isRequired: true,
            maxLength: 160,
        },
        type: {
            type: 'Enum',
            isRequired: true,
        },
        metadata: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
        },
    },
} as const;
