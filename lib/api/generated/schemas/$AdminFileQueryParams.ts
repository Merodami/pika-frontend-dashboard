/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AdminFileQueryParams = {
    description: `Admin file search parameters`,
    properties: {
        search: {
            type: 'string',
            description: `Search in filename or file key`,
        },
        userId: {
            type: 'string',
            format: 'uuid',
        },
        fileType: {
            type: 'Enum',
        },
        status: {
            type: 'Enum',
        },
        provider: {
            type: 'Enum',
        },
        mimeType: {
            type: 'string',
        },
        minSize: {
            type: 'number',
        },
        maxSize: {
            type: 'number',
        },
        isPublic: {
            type: 'boolean',
            isNullable: true,
        },
        fromDate: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        toDate: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
        page: {
            type: 'number',
        },
        limit: {
            type: 'number',
            maximum: 100,
        },
        sortBy: {
            type: 'Enum',
        },
        sortOrder: {
            type: 'Enum',
        },
        include: {
            type: 'string',
            description: `Comma-separated relations: user`,
        },
    },
} as const;
