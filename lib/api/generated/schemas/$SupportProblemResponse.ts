/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SupportProblemResponse = {
    description: `Support problem`,
    properties: {
        id: {
            type: 'string',
            description: `Universally Unique Identifier`,
            isRequired: true,
            format: 'uuid',
        },
        ticketNumber: {
            type: 'string',
        },
        userId: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        title: {
            type: 'string',
            isRequired: true,
        },
        description: {
            type: 'string',
            isRequired: true,
        },
        status: {
            type: 'Enum',
            isRequired: true,
        },
        priority: {
            type: 'Enum',
            isRequired: true,
        },
        type: {
            type: 'Enum',
            isRequired: true,
        },
        resolvedAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        assignedTo: {
            type: 'string',
            format: 'uuid',
        },
        files: {
            type: 'array',
            contains: {
                type: 'string',
            },
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
