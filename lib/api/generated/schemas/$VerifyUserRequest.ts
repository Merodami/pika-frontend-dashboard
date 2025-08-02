/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $VerifyUserRequest = {
    description: `Verify user for internal services`,
    properties: {
        userId: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        verificationType: {
            type: 'Enum',
            isRequired: true,
        },
    },
} as const;
