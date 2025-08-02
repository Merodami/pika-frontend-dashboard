/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BulkUserActionRequest = {
    description: `Update multiple users at once`,
    properties: {
        userIds: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isRequired: true,
        },
        updates: {
            properties: {
                status: {
                    type: 'Enum',
                },
                role: {
                    type: 'Enum',
                },
            },
            isRequired: true,
        },
        reason: {
            type: 'string',
            isRequired: true,
            maxLength: 500,
        },
    },
} as const;
