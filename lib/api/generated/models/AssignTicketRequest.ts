/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Assign ticket to agent
 */
export type AssignTicketRequest = {
    assigneeId: string;
    note?: string;
    /**
     * Support ticket priority level
     */
    priority?: 'low' | 'medium' | 'high' | 'urgent' | 'critical';
};

