/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AdminUserQueryParams = {
    /**
     * Search in name, email, phone
     */
    search?: string;
    email?: string;
    /**
     * User account status
     */
    status?: 'active' | 'suspended' | 'banned' | 'unconfirmed';
    /**
     * User role in the system
     */
    role?: 'admin' | 'customer' | 'business';
    emailVerified?: boolean;
    phoneVerified?: boolean;
    /**
     * ISO 8601 datetime with timezone
     */
    registeredFrom?: string;
    /**
     * ISO 8601 datetime with timezone
     */
    registeredTo?: string;
    /**
     * ISO 8601 datetime with timezone
     */
    lastLoginFrom?: string;
    /**
     * ISO 8601 datetime with timezone
     */
    lastLoginTo?: string;
    minSpent?: number;
    maxSpent?: number;
    hasReports?: boolean;
    page?: number;
    limit?: number;
    /**
     * Field to sort users by (admin view)
     */
    sortBy?: 'createdAt' | 'lastLoginAt' | 'email';
    sortOrder?: 'ASC' | 'DESC';
};

