/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Validate voucher availability and constraints
 */
export type ValidateVoucherRequest = {
    /**
     * Universally Unique Identifier
     */
    voucherId: string;
    /**
     * User ID for user-specific validation
     */
    userId?: string;
    /**
     * Check if redemption limit reached
     */
    checkRedemptionLimit?: boolean;
    /**
     * Check if voucher is expired
     */
    checkExpiry?: boolean;
    /**
     * Check if voucher is in valid state
     */
    checkState?: boolean;
};

