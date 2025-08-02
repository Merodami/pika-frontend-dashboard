/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Support ticket for admin
 */
export type AdminTicketDetailResponse = {
    /**
     * Universally Unique Identifier
     */
    id: string;
    ticketNumber?: string;
    userId: string;
    userName: string;
    userEmail: string;
    title: string;
    description: string;
    /**
     * Support ticket category/type
     */
    type: 'billing' | 'technical' | 'account' | 'general' | 'bug_report' | 'feature_request';
    /**
     * Support ticket status
     */
    status: 'open' | 'assigned' | 'in_progress' | 'waiting_customer' | 'waiting_internal' | 'resolved' | 'closed';
    /**
     * Support ticket priority level
     */
    priority: 'low' | 'medium' | 'high' | 'urgent' | 'critical';
    /**
     * ISO 8601 datetime with timezone
     */
    resolvedAt?: string;
    assignedTo?: string;
    assignedToName?: string;
    files?: Array<string>;
    /**
     * When the record was created
     */
    createdAt: string;
    /**
     * When the record was last updated
     */
    updatedAt: string;
};

