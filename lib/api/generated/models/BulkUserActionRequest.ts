/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Update multiple users at once
 */
export type BulkUserActionRequest = {
    userIds: Array<string>;
    updates: {
        /**
         * User account status
         */
        status?: 'active' | 'suspended' | 'banned' | 'unconfirmed';
        /**
         * User role in the system
         */
        role?: 'admin' | 'customer' | 'business';
    };
    reason: string;
};

