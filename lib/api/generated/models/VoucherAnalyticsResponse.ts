/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Voucher analytics data
 */
export type VoucherAnalyticsResponse = {
    /**
     * Universally Unique Identifier
     */
    voucherId: string;
    period: {
        /**
         * ISO 8601 datetime with timezone
         */
        start: string;
        /**
         * ISO 8601 datetime with timezone
         */
        end: string;
    };
    totalScans: number;
    totalClaims: number;
    totalRedemptions: number;
    uniqueUsers: number;
    redemptionRate: number;
    scansBySource: Record<string, number>;
    scansByType: Record<string, number>;
    dailyStats: Array<{
        /**
         * ISO 8601 datetime with timezone
         */
        date: string;
        scans: number;
        claims: number;
        redemptions: number;
    }>;
};

