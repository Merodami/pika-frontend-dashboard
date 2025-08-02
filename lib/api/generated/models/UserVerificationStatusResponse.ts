/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * User verification status information
 */
export type UserVerificationStatusResponse = {
    userId: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    /**
     * ISO 8601 datetime with timezone
     */
    verificationDate?: string;
};

