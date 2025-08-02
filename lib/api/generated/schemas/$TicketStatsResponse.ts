/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $TicketStatsResponse = {
    description: `Support ticket metrics`,
    properties: {
        period: {
            properties: {
                start: {
                    type: 'string',
                    description: `ISO 8601 datetime with timezone`,
                    isRequired: true,
                    format: 'date-time',
                },
                end: {
                    type: 'string',
                    description: `ISO 8601 datetime with timezone`,
                    isRequired: true,
                    format: 'date-time',
                },
            },
            isRequired: true,
        },
        totalTickets: {
            type: 'number',
            isRequired: true,
        },
        newTickets: {
            type: 'number',
            isRequired: true,
        },
        resolvedTickets: {
            type: 'number',
            isRequired: true,
        },
        averageFirstResponseTime: {
            type: 'number',
            description: `Average time to first response in minutes`,
            isRequired: true,
        },
        averageResolutionTime: {
            type: 'number',
            description: `Average resolution time in hours`,
            isRequired: true,
        },
        ticketsByStatus: {
            properties: {
                open: {
                    type: 'number',
                },
                assigned: {
                    type: 'number',
                },
                in_progress: {
                    type: 'number',
                },
                waiting_customer: {
                    type: 'number',
                },
                waiting_internal: {
                    type: 'number',
                },
                resolved: {
                    type: 'number',
                },
                closed: {
                    type: 'number',
                },
            },
            isRequired: true,
        },
        ticketsByPriority: {
            properties: {
                low: {
                    type: 'number',
                },
                medium: {
                    type: 'number',
                },
                high: {
                    type: 'number',
                },
                urgent: {
                    type: 'number',
                },
                critical: {
                    type: 'number',
                },
            },
            isRequired: true,
        },
        ticketsByType: {
            properties: {
                billing: {
                    type: 'number',
                },
                technical: {
                    type: 'number',
                },
                account: {
                    type: 'number',
                },
                general: {
                    type: 'number',
                },
                bug_report: {
                    type: 'number',
                },
                feature_request: {
                    type: 'number',
                },
            },
            isRequired: true,
        },
        agentStats: {
            type: 'array',
            contains: {
                properties: {
                    agentId: {
                        type: 'string',
                        isRequired: true,
                        format: 'uuid',
                    },
                    agentName: {
                        type: 'string',
                        isRequired: true,
                    },
                    ticketsHandled: {
                        type: 'number',
                        isRequired: true,
                    },
                    averageResponseTime: {
                        type: 'number',
                        isRequired: true,
                    },
                    averageResolutionTime: {
                        type: 'number',
                        isRequired: true,
                    },
                    satisfactionScore: {
                        type: 'number',
                        maximum: 5,
                    },
                },
            },
        },
        averageSatisfaction: {
            type: 'number',
            maximum: 5,
        },
        satisfactionResponseRate: {
            type: 'number',
            maximum: 100,
        },
    },
} as const;
