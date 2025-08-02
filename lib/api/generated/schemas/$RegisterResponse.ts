/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $RegisterResponse = {
    description: `Registration success response`,
    properties: {
        message: {
            type: 'string',
        },
        userId: {
            type: 'string',
            description: `Newly created user ID`,
            isRequired: true,
            format: 'uuid',
        },
        emailSent: {
            type: 'boolean',
            description: `Whether verification email was sent successfully`,
            isRequired: true,
        },
    },
} as const;
