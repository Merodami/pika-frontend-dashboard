/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AdminTicketQueryParams = {
    properties: {
        search: {
            type: 'string',
            description: `Search in title, description`,
        },
        ticketNumber: {
            type: 'string',
        },
        userId: {
            type: 'string',
            format: 'uuid',
        },
        assignedTo: {
            type: 'string',
            format: 'uuid',
        },
        status: {
            type: 'Enum',
        },
        priority: {
            type: 'Enum',
        },
        type: {
            type: 'Enum',
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
            description: `Comma-separated relations: user,assignedUser`,
        },
    },
} as const;
