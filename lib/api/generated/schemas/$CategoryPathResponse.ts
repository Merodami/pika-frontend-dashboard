/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CategoryPathResponse = {
    description: `Category path from root to specified category`,
    properties: {
        data: {
            type: 'array',
            contains: {
                type: 'all-of',
                contains: [{
                    type: 'CategoryResponse',
                }],
            },
            isRequired: true,
        },
    },
} as const;
