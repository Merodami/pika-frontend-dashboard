/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserStatsResponse = {
    description: `User statistics for admin view`,
    properties: {
        userId: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
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
        totalBookings: {
            type: 'number',
            isRequired: true,
        },
        creditsBalance: {
            type: 'number',
            isRequired: true,
        },
        friendsCount: {
            type: 'number',
            isRequired: true,
        },
        followersCount: {
            type: 'number',
            isRequired: true,
        },
        reportsCount: {
            type: 'number',
            isRequired: true,
        },
        activityScore: {
            type: 'number',
            isRequired: true,
            maximum: 100,
        },
        lastActiveDate: {
            type: 'string',
            description: `ISO 8601 datetime with timezone`,
            format: 'date-time',
        },
    },
} as const;
