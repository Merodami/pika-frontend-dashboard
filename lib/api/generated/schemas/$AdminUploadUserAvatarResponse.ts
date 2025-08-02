/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AdminUploadUserAvatarResponse = {
    description: `Avatar upload response`,
    properties: {
        avatarUrl: {
            type: 'string',
            description: `URL of the uploaded avatar`,
            isRequired: true,
            format: 'uri',
        },
    },
} as const;
