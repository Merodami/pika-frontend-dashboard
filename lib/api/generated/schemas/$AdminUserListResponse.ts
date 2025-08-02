/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AdminUserListResponse = {
    description: `Paginated response`,
    properties: {
        data: {
            type: 'array',
            contains: {
                description: `Detailed user information for admin`,
                properties: {
                    id: {
                        type: 'string',
                        isRequired: true,
                        format: 'uuid',
                    },
                    email: {
                        type: 'string',
                        isRequired: true,
                        format: 'email',
                        minLength: 1,
                    },
                    firstName: {
                        type: 'string',
                        isRequired: true,
                    },
                    lastName: {
                        type: 'string',
                        isRequired: true,
                    },
                    phoneNumber: {
                        type: 'string',
                    },
                    dateOfBirth: {
                        type: 'string',
                        description: `Date in YYYY-MM-DD format`,
                        pattern: '^\\d{4}-\\d{2}-\\d{2}$',
                    },
                    avatarUrl: {
                        type: 'string',
                        format: 'uri',
                    },
                    status: {
                        type: 'Enum',
                        isRequired: true,
                    },
                    role: {
                        type: 'Enum',
                        isRequired: true,
                    },
                    emailVerified: {
                        type: 'boolean',
                        isRequired: true,
                    },
                    phoneVerified: {
                        type: 'boolean',
                        isRequired: true,
                    },
                    lastLoginAt: {
                        type: 'string',
                        description: `ISO 8601 datetime with timezone`,
                        format: 'date-time',
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
