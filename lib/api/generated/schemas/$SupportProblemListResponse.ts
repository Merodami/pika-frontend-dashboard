/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SupportProblemListResponse = {
    description: `Paginated response`,
    properties: {
        data: {
            type: 'array',
            contains: {
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
            },
            isRequired: true,
        },
        pagination: {
            description: `Pagination information`,
            properties: {
                page: {
                    type: 'number',
                    description: `Current page number`,
                    isRequired: true,
                },
                limit: {
                    type: 'number',
                    description: `Items per page`,
                    isRequired: true,
                    maximum: 100,
                },
                total: {
                    type: 'number',
                    description: `Total number of items`,
                    isRequired: true,
                },
                totalPages: {
                    type: 'number',
                    description: `Total number of pages`,
                    isRequired: true,
                },
                hasNext: {
                    type: 'boolean',
                    description: `Whether there is a next page`,
                    isRequired: true,
                },
                hasPrev: {
                    type: 'boolean',
                    description: `Whether there is a previous page`,
                    isRequired: true,
                },
            },
            isRequired: true,
        },
    },
} as const;
