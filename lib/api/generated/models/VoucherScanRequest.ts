/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Request to track voucher scan
 */
export type VoucherScanRequest = {
    /**
     * Source of the voucher scan
     */
    scanSource?: 'camera' | 'gallery' | 'link' | 'share';
    location?: {
        latitude: number;
        longitude: number;
    };
    deviceInfo?: {
        platform: string;
        version: string;
        model?: string;
    };
};

