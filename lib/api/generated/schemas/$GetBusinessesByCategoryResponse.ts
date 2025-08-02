/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GetBusinessesByCategoryResponse = {
    description: `Paginated response`,
    properties: {
        data: {
            type: 'array',
            contains: {
                description: `Internal business data for services`,
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
                    businessNameKey: {
                        type: 'string',
                        isRequired: true,
                    },
                    businessDescriptionKey: {
                        type: 'string',
                    },
                    categoryId: {
                        type: 'string',
                        description: `Universally Unique Identifier`,
                        isRequired: true,
                        format: 'uuid',
                    },
                    verified: {
                        type: 'boolean',
                        isRequired: true,
                    },
                    active: {
                        type: 'boolean',
                        isRequired: true,
                    },
                    avgRating: {
                        type: 'number',
                        isRequired: true,
                        maximum: 5,
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
