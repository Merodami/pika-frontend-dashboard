/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Create new support problem
 */
export type CreateSupportProblemRequest = {
    title: string;
    description: string;
    /**
     * Support ticket priority level
     */
    priority?: 'low' | 'medium' | 'high' | 'urgent' | 'critical';
    /**
     * Support ticket category/type
     */
    type?: 'billing' | 'technical' | 'account' | 'general' | 'bug_report' | 'feature_request';
    files?: Array<string>;
};

