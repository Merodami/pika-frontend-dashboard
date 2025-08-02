/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Batch fetch vouchers by IDs
 */
export type GetVouchersByIdsRequest = {
    /**
     * List of voucher IDs to fetch
     */
    voucherIds: Array<string>;
    /**
     * Comma-separated relations: business,category,codes
     */
    include?: string;
};

