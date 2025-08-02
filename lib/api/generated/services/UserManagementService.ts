/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserManagementService {
    /**
     * List all users with admin details
     * @returns any List of users
     * @throws ApiError
     */
    public static getAdminUserList({
        search,
        email,
        status,
        role,
        emailVerified,
        phoneVerified,
        registeredFrom,
        registeredTo,
        lastLoginFrom,
        lastLoginTo,
        minSpent,
        maxSpent,
        hasReports,
        page = 1,
        limit = 20,
        sortBy = 'createdAt',
        sortOrder = 'DESC',
    }: {
        /**
         * Search in name, email, phone
         */
        search?: string,
        email?: string,
        /**
         * User account status
         */
        status?: 'active' | 'suspended' | 'banned' | 'unconfirmed',
        /**
         * User role in the system
         */
        role?: 'admin' | 'customer' | 'business',
        emailVerified?: boolean,
        phoneVerified?: boolean,
        /**
         * ISO 8601 datetime with timezone
         */
        registeredFrom?: string,
        /**
         * ISO 8601 datetime with timezone
         */
        registeredTo?: string,
        /**
         * ISO 8601 datetime with timezone
         */
        lastLoginFrom?: string,
        /**
         * ISO 8601 datetime with timezone
         */
        lastLoginTo?: string,
        minSpent?: number,
        maxSpent?: number,
        hasReports?: boolean,
        page?: number,
        limit?: number,
        /**
         * Field to sort users by (admin view)
         */
        sortBy?: 'createdAt' | 'lastLoginAt' | 'email',
        sortOrder?: 'ASC' | 'DESC',
    }): CancelablePromise<{
        /**
         * Page items
         */
        data: Array<{
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            phoneNumber?: string;
            /**
             * Date in YYYY-MM-DD format
             */
            dateOfBirth?: string;
            avatarUrl?: string;
            /**
             * User account status
             */
            status: 'active' | 'suspended' | 'banned' | 'unconfirmed';
            /**
             * User role in the system
             */
            role: 'admin' | 'customer' | 'business';
            emailVerified: boolean;
            phoneVerified: boolean;
            /**
             * ISO 8601 datetime with timezone
             */
            lastLoginAt?: string;
            /**
             * When the record was created
             */
            createdAt: string;
            /**
             * When the record was last updated
             */
            updatedAt: string;
        }>;
        /**
         * Pagination information
         */
        pagination: {
            /**
             * Current page number
             */
            page: number;
            /**
             * Items per page
             */
            limit: number;
            /**
             * Total number of items
             */
            total: number;
            /**
             * Total number of pages
             */
            totalPages: number;
            /**
             * Whether there is a next page
             */
            hasNext: boolean;
            /**
             * Whether there is a previous page
             */
            hasPrev: boolean;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/users',
            query: {
                'search': search,
                'email': email,
                'status': status,
                'role': role,
                'emailVerified': emailVerified,
                'phoneVerified': phoneVerified,
                'registeredFrom': registeredFrom,
                'registeredTo': registeredTo,
                'lastLoginFrom': lastLoginFrom,
                'lastLoginTo': lastLoginTo,
                'minSpent': minSpent,
                'maxSpent': maxSpent,
                'hasReports': hasReports,
                'page': page,
                'limit': limit,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
            },
        });
    }
    /**
     * Create a new user (admin only)
     * @returns any User created successfully
     * @throws ApiError
     */
    public static createAdminUser({
        requestBody,
    }: {
        requestBody?: {
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
        },
    }): CancelablePromise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber?: string;
        /**
         * Date in YYYY-MM-DD format
         */
        dateOfBirth?: string;
        avatarUrl?: string;
        /**
         * User account status
         */
        status: 'active' | 'suspended' | 'banned' | 'unconfirmed';
        /**
         * User role in the system
         */
        role: 'admin' | 'customer' | 'business';
        emailVerified: boolean;
        phoneVerified: boolean;
        /**
         * ISO 8601 datetime with timezone
         */
        lastLoginAt?: string;
        /**
         * When the record was created
         */
        createdAt: string;
        /**
         * When the record was last updated
         */
        updatedAt: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/users',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid user data`,
                409: `User already exists`,
            },
        });
    }
    /**
     * Get user details
     * @returns any User details
     * @throws ApiError
     */
    public static getAdminUserById({
        id,
    }: {
        id: string,
    }): CancelablePromise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber?: string;
        /**
         * Date in YYYY-MM-DD format
         */
        dateOfBirth?: string;
        avatarUrl?: string;
        /**
         * User account status
         */
        status: 'active' | 'suspended' | 'banned' | 'unconfirmed';
        /**
         * User role in the system
         */
        role: 'admin' | 'customer' | 'business';
        emailVerified: boolean;
        phoneVerified: boolean;
        /**
         * ISO 8601 datetime with timezone
         */
        lastLoginAt?: string;
        /**
         * When the record was created
         */
        createdAt: string;
        /**
         * When the record was last updated
         */
        updatedAt: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/users/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update user information (admin)
     * @returns any User updated successfully
     * @throws ApiError
     */
    public static updateAdminUser({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: {
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
        },
    }): CancelablePromise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber?: string;
        /**
         * Date in YYYY-MM-DD format
         */
        dateOfBirth?: string;
        avatarUrl?: string;
        /**
         * User account status
         */
        status: 'active' | 'suspended' | 'banned' | 'unconfirmed';
        /**
         * User role in the system
         */
        role: 'admin' | 'customer' | 'business';
        emailVerified: boolean;
        phoneVerified: boolean;
        /**
         * ISO 8601 datetime with timezone
         */
        lastLoginAt?: string;
        /**
         * When the record was created
         */
        createdAt: string;
        /**
         * When the record was last updated
         */
        updatedAt: string;
    }> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/admin/users/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `User not found`,
            },
        });
    }
    /**
     * Delete user (admin only)
     * @returns void
     * @throws ApiError
     */
    public static deleteAdminUser({
        id,
    }: {
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `User not found`,
            },
        });
    }
    /**
     * Update user status
     * @returns any User status updated
     * @throws ApiError
     */
    public static updateAdminUserStatus({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: {
            /**
             * User account status
             */
            status: 'active' | 'suspended' | 'banned' | 'unconfirmed';
            reason?: string;
            /**
             * Suspension duration in days
             */
            duration?: number;
            notifyUser?: boolean;
        },
    }): CancelablePromise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber?: string;
        /**
         * Date in YYYY-MM-DD format
         */
        dateOfBirth?: string;
        avatarUrl?: string;
        /**
         * User account status
         */
        status: 'active' | 'suspended' | 'banned' | 'unconfirmed';
        /**
         * User role in the system
         */
        role: 'admin' | 'customer' | 'business';
        emailVerified: boolean;
        phoneVerified: boolean;
        /**
         * ISO 8601 datetime with timezone
         */
        lastLoginAt?: string;
        /**
         * When the record was created
         */
        createdAt: string;
        /**
         * When the record was last updated
         */
        updatedAt: string;
    }> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/admin/users/{id}/status',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Ban user
     * @returns void
     * @throws ApiError
     */
    public static banAdminUser({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: {
            reason?: string;
            /**
             * Ban duration in days
             */
            duration?: number;
            notifyUser?: boolean;
        },
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/users/{id}/ban',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Unban user
     * @returns void
     * @throws ApiError
     */
    public static unbanAdminUser({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: {
            reason?: string;
            notifyUser?: boolean;
        },
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/users/{id}/unban',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get user by email
     * @returns any User details
     * @throws ApiError
     */
    public static getAdminUserByEmail({
        email,
    }: {
        email: string,
    }): CancelablePromise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber?: string;
        /**
         * Date in YYYY-MM-DD format
         */
        dateOfBirth?: string;
        avatarUrl?: string;
        /**
         * User account status
         */
        status: 'active' | 'suspended' | 'banned' | 'unconfirmed';
        /**
         * User role in the system
         */
        role: 'admin' | 'customer' | 'business';
        emailVerified: boolean;
        phoneVerified: boolean;
        /**
         * ISO 8601 datetime with timezone
         */
        lastLoginAt?: string;
        /**
         * When the record was created
         */
        createdAt: string;
        /**
         * When the record was last updated
         */
        updatedAt: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/users/email/{email}',
            path: {
                'email': email,
            },
            errors: {
                404: `User not found`,
            },
        });
    }
    /**
     * Admin verifies user email, phone, or account
     * @returns void
     * @throws ApiError
     */
    public static verifyAdminUser({
        requestBody,
    }: {
        requestBody?: {
            type: 'EMAIL' | 'PHONE' | 'ACCOUNT_CONFIRMATION';
            token?: string;
            code?: string;
            userId?: string;
            email?: string;
            phoneNumber?: string;
        },
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/users/verify',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                404: `User not found`,
            },
        });
    }
    /**
     * Admin resends verification email or SMS
     * @returns any Verification resent
     * @throws ApiError
     */
    public static resendAdminUserVerification({
        requestBody,
    }: {
        requestBody?: {
            type: 'EMAIL' | 'PHONE';
            userId?: string;
            email?: string;
            phoneNumber?: string;
        },
    }): CancelablePromise<{
        success: boolean;
        message: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/users/resend-verification',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                404: `User not found`,
            },
        });
    }
    /**
     * Get user verification status
     * @returns any User verification status retrieved successfully
     * @throws ApiError
     */
    public static getAdminUserVerificationStatus({
        id,
    }: {
        id: string,
    }): CancelablePromise<{
        userId: string;
        emailVerified: boolean;
        phoneVerified: boolean;
        /**
         * ISO 8601 datetime with timezone
         */
        verificationDate?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/users/{id}/verification-status',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden - Admin access required`,
                404: `User not found`,
            },
        });
    }
    /**
     * Upload avatar for a user (admin only)
     * @returns any Avatar uploaded successfully
     * @throws ApiError
     */
    public static uploadAdminUserAvatar({
        id,
        formData,
    }: {
        id: string,
        formData?: {
            /**
             * Avatar image file (multipart/form-data)
             */
            file?: any;
        },
    }): CancelablePromise<{
        /**
         * URL of the uploaded avatar
         */
        avatarUrl: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/users/{id}/avatar',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad request`,
                404: `User not found`,
            },
        });
    }
    /**
     * Get current admin user profile
     * @returns any Admin user profile
     * @throws ApiError
     */
    public static getAdminCurrentUser(): CancelablePromise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber?: string;
        /**
         * Date in YYYY-MM-DD format
         */
        dateOfBirth?: string;
        avatarUrl?: string;
        /**
         * User account status
         */
        status: 'active' | 'suspended' | 'banned' | 'unconfirmed';
        /**
         * User role in the system
         */
        role: 'admin' | 'customer' | 'business';
        emailVerified: boolean;
        phoneVerified: boolean;
        /**
         * ISO 8601 datetime with timezone
         */
        lastLoginAt?: string;
        /**
         * When the record was created
         */
        createdAt: string;
        /**
         * When the record was last updated
         */
        updatedAt: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/users/me',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden - Admin access required`,
            },
        });
    }
    /**
     * Update current admin user profile
     * @returns any Updated admin user profile
     * @throws ApiError
     */
    public static updateAdminCurrentUser({
        requestBody,
    }: {
        requestBody?: {
            firstName?: string;
            lastName?: string;
            phoneNumber?: string;
            /**
             * Date in YYYY-MM-DD format
             */
            dateOfBirth?: string;
            avatarUrl?: string;
        },
    }): CancelablePromise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber?: string;
        /**
         * Date in YYYY-MM-DD format
         */
        dateOfBirth?: string;
        avatarUrl?: string;
        /**
         * User account status
         */
        status: 'active' | 'suspended' | 'banned' | 'unconfirmed';
        /**
         * User role in the system
         */
        role: 'admin' | 'customer' | 'business';
        emailVerified: boolean;
        phoneVerified: boolean;
        /**
         * ISO 8601 datetime with timezone
         */
        lastLoginAt?: string;
        /**
         * When the record was created
         */
        createdAt: string;
        /**
         * When the record was last updated
         */
        updatedAt: string;
    }> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/admin/users/me',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                403: `Forbidden - Admin access required`,
            },
        });
    }
}
