/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Basic user information for authentication context
 */
export type AuthUserResponse = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
    /**
     * User role in the system
     */
    role: 'admin' | 'customer' | 'business';
};

