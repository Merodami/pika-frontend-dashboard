/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AdminUpdateProblemRequest = {
    description: `Admin update support problem`,
    properties: {
        title: {
            type: 'string',
            maxLength: 200,
            minLength: 1,
        },
        description: {
            type: 'string',
            maxLength: 5000,
            minLength: 1,
        },
        priority: {
            type: 'Enum',
        },
        type: {
            type: 'Enum',
        },
        status: {
            type: 'Enum',
        },
        assignedTo: {
            type: 'string',
            format: 'uuid',
        },
        resolvedAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        files: {
            type: 'array',
            contains: {
                type: 'string',
            },
        },
    },
} as const;
