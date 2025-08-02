/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BulkBusinessRequest = {
    description: `Get multiple businesses by IDs`,
    properties: {
        businessIds: {
            type: 'array',
            contains: {
                type: 'string',
                description: `Universally Unique Identifier`,
                format: 'uuid',
            },
            isRequired: true,
        },
        include: {
            type: 'string',
            description: `Comma-separated relations: user,category`,
        },
    },
} as const;
