/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoryResponse } from './CategoryResponse';
/**
 * Business information for admin management
 */
export type AdminBusinessResponse = {
    /**
     * Universally Unique Identifier
     */
    id: string;
    /**
     * User who owns this business
     */
    userId: string;
    /**
     * Translation key for business name
     */
    businessNameKey: string;
    /**
     * Translation key for business description
     */
    businessDescriptionKey?: string;
    /**
     * Category this business belongs to
     */
    categoryId: string;
    /**
     * Whether business is verified
     */
    verified?: boolean;
    /**
     * Whether business is active
     */
    active?: boolean;
    /**
     * Average rating of the business
     */
    avgRating?: number;
    /**
     * Soft deletion timestamp
     */
    deletedAt: string | null;
    /**
     * Business owner details when ?include=user
     */
    user?: {
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
    };
    category?: CategoryResponse;
    /**
     * When the record was created
     */
    createdAt: string;
    /**
     * When the record was last updated
     */
    updatedAt: string;
};

