/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Update user information (admin)
 */
export type AdminUpdateUserRequest = {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
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
    activeMembership?: boolean;
    description?: string;
    specialties?: Array<string>;
};

