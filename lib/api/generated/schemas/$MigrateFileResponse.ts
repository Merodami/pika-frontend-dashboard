/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $MigrateFileResponse = {
    description: `File migration result`,
    properties: {
        fileId: {
            type: 'string',
            description: `Universally Unique Identifier`,
            isRequired: true,
            format: 'uuid',
        },
        oldProvider: {
            type: 'Enum',
            isRequired: true,
        },
        newProvider: {
            type: 'Enum',
            isRequired: true,
        },
        oldFileKey: {
            type: 'string',
            isRequired: true,
        },
        newFileKey: {
            type: 'string',
            isRequired: true,
        },
        migrationStatus: {
            type: 'Enum',
            isRequired: true,
        },
        error: {
            type: 'string',
        },
        migratedAt: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            isRequired: true,
            format: 'date-time',
        },
    },
} as const;
