/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $RegisterPushTokenRequest = {
    description: `Register device for push notifications`,
    properties: {
        token: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        platform: {
            type: 'Enum',
            isRequired: true,
        },
        deviceId: {
            type: 'string',
        },
        deviceName: {
            type: 'string',
        },
    },
} as const;
