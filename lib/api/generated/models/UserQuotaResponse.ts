/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * User storage quota information
 */
export type UserQuotaResponse = {
    userId: string;
    canUpload: boolean;
    quotaExceeded: boolean;
    /**
     * Current usage in bytes
     */
    currentUsage: number;
    /**
     * Quota limit in bytes
     */
    quotaLimit: number;
    /**
     * Remaining space in bytes
     */
    remainingSpace: number;
    fileCountLimit?: number;
    currentFileCount: number;
};

