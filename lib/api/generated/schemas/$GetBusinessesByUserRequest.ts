/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GetBusinessesByUserRequest = {
    description: `Get all businesses owned by a user`,
    properties: {
        userId: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        includeInactive: {
            type: 'boolean',
        },
        includeUnverified: {
            type: 'boolean',
        },
    },
} as const;
