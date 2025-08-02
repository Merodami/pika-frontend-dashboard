/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FileIdParam = {
    description: `File ID path parameter`,
    properties: {
        fileId: {
            type: 'string',
            description: `Universally Unique Identifier`,
            isRequired: true,
            format: 'uuid',
        },
    },
} as const;
