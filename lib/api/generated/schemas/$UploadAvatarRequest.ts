/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UploadAvatarRequest = {
    description: `Upload user avatar/profile picture`,
    properties: {
        avatar: {
            type: 'string',
            description: `Base64 encoded image data or file upload`,
            isRequired: true,
        },
        format: {
            type: 'Enum',
        },
    },
} as const;
