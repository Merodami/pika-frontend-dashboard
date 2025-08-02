/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubscriptionQueryParams = {
    /**
     * Page number
     */
    page?: number;
    /**
     * Items per page
     */
    limit?: number;
    /**
     * Field to sort subscriptions by
     */
    sortBy?: 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'status';
    /**
     * Sort order
     */
    sortOrder?: 'asc' | 'desc';
    /**
     * Search query
     */
    search?: string;
    /**
     * Subscription status
     */
    status?: 'active' | 'canceled' | 'incomplete' | 'incompleteExpired' | 'pastDue' | 'trialing' | 'unpaid';
    userId?: string;
    /**
     * Universally Unique Identifier
     */
    planId?: string;
    cancelAtPeriodEnd?: boolean;
};

