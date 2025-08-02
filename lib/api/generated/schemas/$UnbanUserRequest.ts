/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UnbanUserRequest = {
    description: `Unban a user`,
    properties: {
        reason: {
            type: 'string',
            maxLength: 500,
            minLength: 1,
        },
        notifyUser: {
            type: 'boolean',
        },
    },
} as const;
