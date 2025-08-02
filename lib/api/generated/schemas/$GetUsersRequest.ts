/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GetUsersRequest = {
    description: `Get multiple users by ID`,
    properties: {
        userIds: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isRequired: true,
        },
        fields: {
            type: 'array',
            contains: {
                type: 'string',
            },
        },
    },
} as const;
