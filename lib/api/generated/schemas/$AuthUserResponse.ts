/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AuthUserResponse = {
    description: `Basic user information for authentication context`,
    properties: {
        id: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        email: {
            type: 'string',
            isRequired: true,
            format: 'email',
            minLength: 1,
        },
        firstName: {
            type: 'string',
            isRequired: true,
        },
        lastName: {
            type: 'string',
            isRequired: true,
        },
        profilePicture: {
            type: 'string',
            format: 'uri',
        },
        role: {
            type: 'Enum',
            isRequired: true,
        },
    },
} as const;
