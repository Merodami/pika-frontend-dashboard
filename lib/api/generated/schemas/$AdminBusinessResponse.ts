/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AdminBusinessResponse = {
    description: `Business information for admin management`,
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
        deletedAt: {
            type: 'string',
            description: `Soft deletion timestamp`,
            isRequired: true,
            isNullable: true,
            format: 'date-time',
        },
        user: {
            description: `Business owner details when ?include=user`,
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
} as const;
