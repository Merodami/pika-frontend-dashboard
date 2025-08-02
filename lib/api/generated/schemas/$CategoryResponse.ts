/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CategoryResponse = {
    description: `Category information when ?include=category`,
    properties: {
        id: {
            type: 'string',
            description: `Universally Unique Identifier`,
            isRequired: true,
            format: 'uuid',
        },
        nameKey: {
            type: 'string',
            description: `Translation key for category name`,
            isRequired: true,
            maxLength: 255,
        },
        descriptionKey: {
            type: 'string',
            description: `Translation key for category description`,
            maxLength: 255,
        },
        icon: {
            type: 'string',
            description: `Category icon identifier`,
            maxLength: 255,
        },
        parentId: {
            type: 'string',
            description: `Parent category ID for hierarchical structure`,
            format: 'uuid',
        },
        isActive: {
            type: 'boolean',
            description: `Whether category is active`,
        },
        sortOrder: {
            type: 'number',
            description: `Sort order for display`,
        },
        slug: {
            type: 'string',
            description: `URL-friendly category identifier`,
            isRequired: true,
            maxLength: 255,
        },
        level: {
            type: 'number',
            description: `Hierarchy level (1 for root, 2+ for children)`,
            isRequired: true,
        },
        path: {
            type: 'string',
            description: `Hierarchical path using parent IDs`,
            isRequired: true,
        },
        createdBy: {
            type: 'string',
            description: `User who created the category`,
            isRequired: true,
            format: 'uuid',
        },
        updatedBy: {
            type: 'string',
            description: `User who last updated the category`,
            format: 'uuid',
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
        children: {
            type: 'array',
            contains: {
                type: 'CategoryResponse',
            },
        },
    },
} as const;
