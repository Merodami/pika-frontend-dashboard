/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UpdateTicketStatusRequest = {
    description: `Update ticket status`,
    properties: {
        status: {
            type: 'Enum',
            isRequired: true,
        },
        note: {
            type: 'string',
            maxLength: 1000,
        },
        notifyUser: {
            type: 'boolean',
        },
    },
} as const;
