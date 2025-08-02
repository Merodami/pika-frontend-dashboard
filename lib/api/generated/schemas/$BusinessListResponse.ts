/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BusinessListResponse = {
    description: `Paginated response`,
    properties: {
        data: {
            type: 'array',
            contains: {
                description: `Business information for public view`,
                properties: {
                    id: {
                        type: 'string',
                        description: `Universally Unique Identifier`,
                        isRequired: true,
                        format: 'uuid',
                    },
                    userId: {
                        type: 'string',
                        description: `User who owns this business`,
                        isRequired: true,
                        format: 'uuid',
                    },
                    businessNameKey: {
                        type: 'string',
                        description: `Translation key for business name`,
                        isRequired: true,
                        maxLength: 255,
                    },
                    businessDescriptionKey: {
                        type: 'string',
                        description: `Translation key for business description`,
                        maxLength: 255,
                    },
                    categoryId: {
                        type: 'string',
                        description: `Category this business belongs to`,
                        isRequired: true,
                        format: 'uuid',
                    },
                    verified: {
                        type: 'boolean',
                        description: `Whether business is verified`,
                    },
                    active: {
                        type: 'boolean',
                        description: `Whether business is active`,
                    },
                    avgRating: {
                        type: 'number',
                        description: `Average rating of the business`,
                        maximum: 5,
                    },
                    user: {
                        description: `Business owner profile when ?include=user`,
                        properties: {
                            id: {
                                type: 'string',
                                isRequired: true,
                                format: 'uuid',
                            },
                            firstName: {
                                type: 'string',
                                isRequired: true,
                                maxLength: 50,
                            },
                            lastName: {
                                type: 'string',
                                isRequired: true,
                                maxLength: 50,
                            },
                            displayName: {
                                type: 'string',
                                maxLength: 100,
                            },
                            avatarUrl: {
                                type: 'string',
                                format: 'uri',
                            },
                            bio: {
                                type: 'string',
                                maxLength: 500,
                            },
                            createdAt: {
                                type: 'string',
                                description: `ISO 8601 datetime with timezone`,
                                isRequired: true,
                                format: 'date-time',
                            },
                        },
                    },
                    category: {
                        type: 'CategoryResponse',
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
