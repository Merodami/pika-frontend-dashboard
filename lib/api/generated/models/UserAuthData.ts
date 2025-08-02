/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * User data for authentication
 */
export type UserAuthData = {
    id: string;
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    /**
     * User role in the system
     */
    role: 'admin' | 'customer' | 'business';
    /**
     * User account status
     */
    status: 'active' | 'suspended' | 'banned' | 'unconfirmed';
    emailVerified: boolean;
    /**
     * ISO 8601 datetime with timezone
     */
    createdAt: string;
    /**
     * ISO 8601 datetime with timezone
     */
    lastLoginAt?: string;
};

