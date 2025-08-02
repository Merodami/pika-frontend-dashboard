/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AssignTicketRequest = {
    description: `Assign ticket to agent`,
    properties: {
        assigneeId: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        note: {
            type: 'string',
            maxLength: 500,
        },
        priority: {
            type: 'Enum',
        },
    },
} as const;
