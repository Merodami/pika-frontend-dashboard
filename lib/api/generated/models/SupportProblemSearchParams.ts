/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SupportProblemSearchParams = {
    /**
     * Page number
     */
    page?: number;
    /**
     * Items per page
     */
    limit?: number;
    sortBy?: 'createdAt' | 'updatedAt' | 'priority' | 'status';
    /**
     * Sort order
     */
    sortOrder?: 'asc' | 'desc';
    /**
     * Search query
     */
    search?: string;
    /**
     * Support ticket status
     */
    status?: 'open' | 'assigned' | 'in_progress' | 'waiting_customer' | 'waiting_internal' | 'resolved' | 'closed';
    /**
     * Support ticket priority level
     */
    priority?: 'low' | 'medium' | 'high' | 'urgent' | 'critical';
    /**
     * Support ticket category/type
     */
    type?: 'billing' | 'technical' | 'account' | 'general' | 'bug_report' | 'feature_request';
};

