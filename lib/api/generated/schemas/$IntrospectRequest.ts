/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $IntrospectRequest = {
    description: `Token introspection request`,
    properties: {
        token: {
            type: 'string',
            description: `Token to validate`,
            isRequired: true,
            minLength: 1,
        },
        tokenTypeHint: {
            type: 'Enum',
        },
    },
} as const;
