/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Support ticket metrics
 */
export type TicketStatsResponse = {
    period: {
        /**
         * ISO 8601 datetime with timezone
         */
        start: string;
        /**
         * ISO 8601 datetime with timezone
         */
        end: string;
    };
    totalTickets: number;
    newTickets: number;
    resolvedTickets: number;
    /**
     * Average time to first response in minutes
     */
    averageFirstResponseTime: number;
    /**
     * Average resolution time in hours
     */
    averageResolutionTime: number;
    ticketsByStatus: {
        open?: number;
        assigned?: number;
        in_progress?: number;
        waiting_customer?: number;
        waiting_internal?: number;
        resolved?: number;
        closed?: number;
    };
    ticketsByPriority: {
        low?: number;
        medium?: number;
        high?: number;
        urgent?: number;
        critical?: number;
    };
    ticketsByType: {
        billing?: number;
        technical?: number;
        account?: number;
        general?: number;
        bug_report?: number;
        feature_request?: number;
    };
    agentStats?: Array<{
        agentId: string;
        agentName: string;
        ticketsHandled: number;
        averageResponseTime: number;
        averageResolutionTime: number;
        satisfactionScore?: number;
    }>;
    averageSatisfaction?: number;
    satisfactionResponseRate?: number;
};

