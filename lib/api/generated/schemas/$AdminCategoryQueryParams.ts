/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AdminCategoryQueryParams = {
    properties: {
        page: {
            type: 'number',
            description: `Page number`,
        },
        limit: {
            type: 'number',
            description: `Items per page`,
            maximum: 100,
        },
        sortBy: {
            type: 'Enum',
        },
        sortOrder: {
            type: 'Enum',
        },
        search: {
            type: 'string',
            description: `Search query`,
        },
        parentId: {
            type: 'string',
            description: `Filter by parent category`,
            format: 'uuid',
        },
        isActive: {
            type: 'boolean',
            description: `Filter by active status`,
        },
        createdBy: {
            type: 'string',
            description: `Filter by creator`,
            format: 'uuid',
        },
        include: {
            type: 'string',
            description: `Comma-separated relations: parent,children`,
        },
    },
} as const;
