/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GetUserByEmailRequest = {
    description: `Get user by email`,
    properties: {
        email: {
            type: 'string',
            isRequired: true,
            format: 'email',
            minLength: 1,
        },
    },
} as const;
