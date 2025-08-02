/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Update multiple vouchers at once
 */
export type BulkVoucherUpdateRequest = {
    voucherIds: Array<string>;
    updates: {
        /**
         * Current state of the voucher lifecycle
         */
        state?: 'draft' | 'published' | 'claimed' | 'redeemed' | 'expired' | 'suspended';
        /**
         * ISO 8601 datetime with timezone
         */
        expiresAt?: string;
        maxRedemptions?: number | null;
        maxRedemptionsPerUser?: number;
    };
    reason: string;
};

