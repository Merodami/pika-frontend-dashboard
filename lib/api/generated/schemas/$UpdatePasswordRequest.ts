/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UpdatePasswordRequest = {
    description: `Update user password`,
    properties: {
        userId: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        passwordHash: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
