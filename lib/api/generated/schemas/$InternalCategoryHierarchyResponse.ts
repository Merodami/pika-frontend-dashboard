/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $InternalCategoryHierarchyResponse = {
    description: `Category hierarchy for internal use`,
    properties: {
        data: {
            type: 'array',
            contains: {
                description: `Internal category data for services`,
                properties: {
                    id: {
                        type: 'string',
                        description: `Universally Unique Identifier`,
                        isRequired: true,
                        format: 'uuid',
                    },
                    nameKey: {
                        type: 'string',
                        isRequired: true,
                    },
                    descriptionKey: {
                        type: 'string',
                    },
                    icon: {
                        type: 'string',
                    },
                    parentId: {
                        type: 'string',
                        description: `Universally Unique Identifier`,
                        format: 'uuid',
                    },
                    isActive: {
                        type: 'boolean',
                        isRequired: true,
                    },
                    sortOrder: {
                        type: 'number',
                        isRequired: true,
                    },
                },
            },
            isRequired: true,
        },
    },
} as const;
