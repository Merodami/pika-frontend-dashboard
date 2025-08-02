/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BulkBusinessResponse = {
    description: `Businesses data with not found IDs`,
    properties: {
        businesses: {
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
        notFound: {
            type: 'array',
            contains: {
                type: 'string',
                description: `Universally Unique Identifier`,
                format: 'uuid',
            },
        },
    },
} as const;
