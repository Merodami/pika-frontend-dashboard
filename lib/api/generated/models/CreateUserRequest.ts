/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Create new user for registration with full profile data
 */
export type CreateUserRequest = {
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    /**
     * Date string in YYYY-MM-DD format
     */
    dateOfBirth?: string;
    acceptTerms: boolean;
    marketingConsent?: boolean;
    /**
     * User role in the system
     */
    role: 'admin' | 'customer' | 'business';
    avatarUrl?: string;
};

