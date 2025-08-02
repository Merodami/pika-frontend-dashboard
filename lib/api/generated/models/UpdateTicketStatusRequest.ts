/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Update ticket status
 */
export type UpdateTicketStatusRequest = {
    /**
     * Support ticket status
     */
    status: 'open' | 'assigned' | 'in_progress' | 'waiting_customer' | 'waiting_internal' | 'resolved' | 'closed';
    note?: string;
    notifyUser?: boolean;
};

