/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubscriptionPlanQueryParams = {
    /**
     * Page number
     */
    page?: number;
    /**
     * Items per page
     */
    limit?: number;
    /**
     * Field to sort plans by
     */
    sortBy?: 'name' | 'price' | 'createdAt' | 'updatedAt';
    /**
     * Sort order
     */
    sortOrder?: 'asc' | 'desc';
    /**
     * Search query
     */
    search?: string;
    isActive?: boolean | null;
    /**
     * Billing interval for subscriptions
     */
    interval?: 'day' | 'week' | 'month' | 'year';
    /**
     * Plan type category
     */
    planType?: 'basic' | 'premium' | 'enterprise' | 'trial';
};

