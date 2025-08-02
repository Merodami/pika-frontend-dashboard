/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SupportCommentResponse = {
    description: `Support comment`,
    properties: {
        id: {
            type: 'string',
            description: `Universally Unique Identifier`,
            isRequired: true,
            format: 'uuid',
        },
        problemId: {
            type: 'string',
            description: `Universally Unique Identifier`,
            isRequired: true,
            format: 'uuid',
        },
        userId: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        content: {
            type: 'string',
            isRequired: true,
        },
        isInternal: {
            type: 'boolean',
        },
        createdAt: {
            type: 'string',
            description: `When the record was created`,
            isRequired: true,
            format: 'date-time',
        },
        updatedAt: {
            type: 'string',
            description: `When the record was last updated`,
            isRequired: true,
            format: 'date-time',
        },
    },
} as const;
