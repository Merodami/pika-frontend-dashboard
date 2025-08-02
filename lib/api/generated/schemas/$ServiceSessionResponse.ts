/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ServiceSessionResponse = {
    description: `Service session details`,
    properties: {
        sessionId: {
            type: 'string',
            description: `Universally Unique Identifier`,
            isRequired: true,
            format: 'uuid',
        },
        token: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        expiresAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            isRequired: true,
            format: 'date-time',
        },
    },
} as const;
