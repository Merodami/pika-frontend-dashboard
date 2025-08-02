/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GetUserAuthDataByEmailRequest = {
    description: `Get user auth data by email for authentication`,
    properties: {
        email: {
            type: 'string',
            isRequired: true,
            format: 'email',
            minLength: 1,
        },
    },
} as const;
