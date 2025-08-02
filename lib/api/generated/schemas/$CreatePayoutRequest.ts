/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreatePayoutRequest = {
    description: `Process pending payouts`,
    properties: {
        payoutIds: {
            type: 'array',
            contains: {
                type: 'string',
                description: `Universally Unique Identifier`,
                format: 'uuid',
            },
            isRequired: true,
        },
        action: {
            type: 'Enum',
            isRequired: true,
        },
        reason: {
            type: 'string',
            maxLength: 500,
        },
        delayUntil: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
    },
} as const;
