/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AdminTicketQueryParams = {
    /**
     * Search in title, description
     */
    search?: string;
    ticketNumber?: string;
    userId?: string;
    assignedTo?: string;
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
    page?: number;
    limit?: number;
    /**
     * Field to sort admin tickets by
     */
    sortBy?: 'createdAt' | 'updatedAt' | 'resolvedAt' | 'priority' | 'status';
    /**
     * Sort order - ascending (asc) or descending (desc)
     */
    sortOrder?: 'asc' | 'desc';
    /**
     * Comma-separated relations: user,assignedUser
     */
    include?: string;
};

