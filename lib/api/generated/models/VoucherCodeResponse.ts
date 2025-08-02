/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Voucher code information
 */
export type VoucherCodeResponse = {
    /**
     * Universally Unique Identifier
     */
    id: string;
    code: string;
    /**
     * Type of voucher code
     */
    type: 'qr' | 'short' | 'static';
    isActive: boolean;
    metadata?: Record<string, any>;
};

