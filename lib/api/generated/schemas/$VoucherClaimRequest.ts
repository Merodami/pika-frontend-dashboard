/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $VoucherClaimRequest = {
    description: `Request to claim voucher to wallet`,
    properties: {
        notificationPreferences: {
            properties: {
                enableReminders: {
                    type: 'boolean',
                },
                reminderDaysBefore: {
                    type: 'number',
                    maximum: 30,
                    minimum: 1,
                },
            },
        },
    },
} as const;
