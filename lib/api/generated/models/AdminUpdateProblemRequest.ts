/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Admin update support problem
 */
export type AdminUpdateProblemRequest = {
    title?: string;
    description?: string;
    /**
     * Support ticket priority level
     */
    priority?: 'low' | 'medium' | 'high' | 'urgent' | 'critical';
    /**
     * Support ticket category/type
     */
    type?: 'billing' | 'technical' | 'account' | 'general' | 'bug_report' | 'feature_request';
    /**
     * Support ticket status
     */
    status?: 'open' | 'assigned' | 'in_progress' | 'waiting_customer' | 'waiting_internal' | 'resolved' | 'closed';
    assignedTo?: string;
    /**
     * ISO 8601 datetime with timezone
     */
    resolvedAt?: string;
    files?: Array<string>;
};

