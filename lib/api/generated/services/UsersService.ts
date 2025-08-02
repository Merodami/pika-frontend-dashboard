/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Get current user profile
     * @returns any User profile
     * @throws ApiError
     */
    public static getUserProfile(): CancelablePromise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        displayName?: string;
        /**
         * Phone number in E.164 format
         */
        phoneNumber?: string;
        avatarUrl?: string;
        bio?: string;
        /**
         * Date in YYYY-MM-DD format
         */
        dateOfBirth?: string;
        preferredLanguage?: string;
        /**
         * User role in the system
         */
        role: 'admin' | 'customer' | 'business';
        /**
         * User account status
         */
        status: 'active' | 'suspended' | 'banned' | 'unconfirmed';
        emailVerified: boolean;
        phoneVerified?: boolean;
        /**
         * ISO 8601 datetime with timezone
         */
        createdAt: string;
        /**
         * ISO 8601 datetime with timezone
         */
        updatedAt: string;
        /**
         * ISO 8601 datetime with timezone
         */
        lastLoginAt?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Update user profile
     * @returns any Updated profile
     * @throws ApiError
     */
    public static updateUserProfile({
        requestBody,
    }: {
        requestBody?: {
            firstName?: string;
            lastName?: string;
            displayName?: string;
            /**
             * Phone number in E.164 format
             */
            phoneNumber?: string;
            bio?: string;
            /**
             * Date in YYYY-MM-DD format
             */
            dateOfBirth?: string;
            preferredLanguage?: string;
        },
    }): CancelablePromise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        displayName?: string;
        /**
         * Phone number in E.164 format
         */
        phoneNumber?: string;
        avatarUrl?: string;
        bio?: string;
        /**
         * Date in YYYY-MM-DD format
         */
        dateOfBirth?: string;
        preferredLanguage?: string;
        /**
         * User role in the system
         */
        role: 'admin' | 'customer' | 'business';
        /**
         * User account status
         */
        status: 'active' | 'suspended' | 'banned' | 'unconfirmed';
        emailVerified: boolean;
        phoneVerified?: boolean;
        /**
         * ISO 8601 datetime with timezone
         */
        createdAt: string;
        /**
         * ISO 8601 datetime with timezone
         */
        updatedAt: string;
        /**
         * ISO 8601 datetime with timezone
         */
        lastLoginAt?: string;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/users/me',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
