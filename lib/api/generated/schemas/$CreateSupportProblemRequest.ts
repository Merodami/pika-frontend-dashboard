/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateSupportProblemRequest = {
    description: `Create new support problem`,
    properties: {
        title: {
            type: 'string',
            isRequired: true,
            maxLength: 200,
            minLength: 1,
        },
        description: {
            type: 'string',
            isRequired: true,
            maxLength: 5000,
            minLength: 1,
        },
        priority: {
            type: 'Enum',
        },
        type: {
            type: 'Enum',
        },
        files: {
            type: 'array',
            contains: {
                type: 'string',
            },
        },
    },
} as const;
