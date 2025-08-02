/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $RefundTransactionRequest = {
    description: `Refund a transaction`,
    properties: {
        amount: {
            type: 'number',
            description: `Partial refund amount`,
        },
        reason: {
            type: 'Enum',
            isRequired: true,
        },
        description: {
            type: 'string',
            isRequired: true,
            maxLength: 500,
        },
        notifyUser: {
            type: 'boolean',
        },
    },
} as const;
