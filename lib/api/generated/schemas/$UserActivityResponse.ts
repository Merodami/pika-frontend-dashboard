/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserActivityResponse = {
    description: `Paginated response`,
    properties: {
        data: {
            type: 'array',
            contains: {
                properties: {
                    id: {
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
                    action: {
                        type: 'string',
                        isRequired: true,
                    },
                    category: {
                        type: 'Enum',
                        isRequired: true,
                    },
                    details: {
                        type: 'dictionary',
                        contains: {
                            properties: {
                            },
                        },
                    },
                    ipAddress: {
                        type: 'string',
                    },
                    userAgent: {
                        type: 'string',
                    },
                    timestamp: {
                        type: 'string',
                        description: `ISO 8601 datetime with timezone`,
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
