/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BanUserRequest = {
    description: `Ban a user`,
    properties: {
        reason: {
            type: 'string',
            maxLength: 500,
            minLength: 1,
        },
        duration: {
            type: 'number',
            description: `Ban duration in days`,
        },
        notifyUser: {
            type: 'boolean',
        },
    },
} as const;
