/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CheckUserPermissionRequest = {
    description: `Check user permission`,
    properties: {
        userId: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        resource: {
            type: 'string',
            isRequired: true,
        },
        action: {
            type: 'Enum',
            isRequired: true,
        },
        resourceId: {
            type: 'string',
        },
    },
} as const;
