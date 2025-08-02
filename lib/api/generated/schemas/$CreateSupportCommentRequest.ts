/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateSupportCommentRequest = {
    description: `Create new support comment`,
    properties: {
        problemId: {
            type: 'string',
            description: `Universally Unique Identifier`,
            isRequired: true,
            format: 'uuid',
        },
        content: {
            type: 'string',
            isRequired: true,
            maxLength: 5000,
            minLength: 1,
        },
    },
} as const;
