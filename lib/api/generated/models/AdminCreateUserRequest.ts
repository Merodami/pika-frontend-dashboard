/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Create a new user (admin only)
 */
export type AdminCreateUserRequest = {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    /**
     * Date in YYYY-MM-DD format
     */
    dateOfBirth?: string;
    /**
     * User role in the system
     */
    role?: 'admin' | 'customer' | 'business';
    /**
     * User account status
     */
    status?: 'active' | 'suspended' | 'banned' | 'unconfirmed';
    appVersion?: string;
    alias?: string;
};

