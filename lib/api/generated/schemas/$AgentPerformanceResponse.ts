/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AgentPerformanceResponse = {
    description: `Individual agent performance metrics`,
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
        ticketsHandled: {
            type: 'number',
            isRequired: true,
        },
        ticketsResolved: {
            type: 'number',
            isRequired: true,
        },
        averageResponseTime: {
            type: 'number',
            description: `In minutes`,
            isRequired: true,
        },
        averageResolutionTime: {
            type: 'number',
            description: `In hours`,
            isRequired: true,
        },
        satisfactionScore: {
            type: 'number',
            maximum: 5,
        },
        firstContactResolutionRate: {
            type: 'number',
            isRequired: true,
            maximum: 100,
        },
    },
} as const;
