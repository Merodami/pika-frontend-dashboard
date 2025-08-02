/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Paginated response
 */
export type AdminUserListResponse = {
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
};

