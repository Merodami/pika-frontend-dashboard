/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserInfoResponse = {
    description: `User information from access token`,
    properties: {
        id: {
            type: 'string',
            description: `User ID`,
            isRequired: true,
            format: 'uuid',
        },
        email: {
            type: 'string',
            isRequired: true,
            format: 'email',
            minLength: 1,
        },
        emailVerified: {
            type: 'boolean',
        },
        firstName: {
            type: 'string',
            isRequired: true,
        },
        lastName: {
            type: 'string',
            isRequired: true,
        },
        fullName: {
            type: 'string',
            description: `Combined first and last name`,
        },
        profilePicture: {
            type: 'string',
            format: 'uri',
        },
        role: {
            type: 'Enum',
            isRequired: true,
        },
        permissions: {
            type: 'array',
            contains: {
                type: 'string',
            },
        },
        locale: {
            type: 'string',
            description: `User locale`,
        },
        createdAt: {
            type: 'string',
            format: 'date-time',
        },
        updatedAt: {
            type: 'string',
            format: 'date-time',
        },
    },
} as const;
