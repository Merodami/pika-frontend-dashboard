/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoryResponse } from './CategoryResponse';
/**
 * Business information for public view
 */
export type BusinessResponse = {
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
     * Business owner profile when ?include=user
     */
    user?: {
        id: string;
        firstName: string;
        lastName: string;
        displayName?: string;
        avatarUrl?: string;
        bio?: string;
        /**
         * ISO 8601 datetime with timezone
         */
        createdAt: string;
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

