/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $MoveCategoryRequest = {
    description: `Move category to different parent or change sort order`,
    properties: {
        parentId: {
            type: 'string',
            description: `New parent category ID (null for root level)`,
            format: 'uuid',
        },
        sortOrder: {
            type: 'number',
            description: `New sort order within parent`,
        },
    },
} as const;
