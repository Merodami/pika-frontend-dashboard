/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SubscriptionListResponse = {
    description: `Paginated response`,
    properties: {
        data: {
            type: 'array',
            contains: {
                description: `Subscription details`,
                properties: {
                    id: {
                        type: 'string',
                        description: `Universally Unique Identifier`,
                        isRequired: true,
                        format: 'uuid',
                    },
                    userId: {
                        type: 'string',
                        isRequired: true,
                        format: 'uuid',
                    },
                    planId: {
                        type: 'string',
                        description: `Universally Unique Identifier`,
                        format: 'uuid',
                    },
                    planType: {
                        type: 'string',
                        description: `Plan type (for backward compatibility)`,
                        isRequired: true,
                    },
                    status: {
                        type: 'Enum',
                        isRequired: true,
                    },
                    billingInterval: {
                        type: 'string',
                        description: `Billing interval (for backward compatibility)`,
                        isRequired: true,
                    },
                    currentPeriodStart: {
                        type: 'string',
                        description: `Current billing period start date`,
                        format: 'date-time',
                    },
                    currentPeriodEnd: {
                        type: 'string',
                        description: `Current billing period end date`,
                        format: 'date-time',
                    },
                    trialEnd: {
                        type: 'string',
                        description: `Trial end date`,
                        format: 'date-time',
                    },
                    cancelAtPeriodEnd: {
                        type: 'boolean',
                        description: `Whether to cancel at period end`,
                    },
                    stripeCustomerId: {
                        type: 'string',
                        description: `Stripe customer ID`,
                    },
                    stripeSubscriptionId: {
                        type: 'string',
                        description: `Stripe subscription ID`,
                    },
                    stripePriceId: {
                        type: 'string',
                        description: `Stripe price ID`,
                    },
                    startDate: {
                        type: 'string',
                        description: `Subscription start date`,
                        format: 'date-time',
                    },
                    endDate: {
                        type: 'string',
                        description: `Subscription end date`,
                        format: 'date-time',
                    },
                    lastProcessedAt: {
                        type: 'string',
                        description: `Last credit processing date`,
                        format: 'date-time',
                    },
                    cancelledAt: {
                        type: 'string',
                        description: `Cancellation date`,
                        format: 'date-time',
                    },
                    createdAt: {
                        type: 'string',
                        description: `When the record was created`,
                        isRequired: true,
                        format: 'date-time',
                    },
                    updatedAt: {
                        type: 'string',
                        description: `When the record was last updated`,
                        isRequired: true,
                        format: 'date-time',
                    },
                    plan: {
                        description: `Subscription plan details`,
                        properties: {
                            id: {
                                type: 'string',
                                description: `Universally Unique Identifier`,
                                isRequired: true,
                                format: 'uuid',
                            },
                            name: {
                                type: 'string',
                                description: `Name of the subscription plan`,
                                isRequired: true,
                            },
                            description: {
                                type: 'string',
                                description: `Description of the subscription plan`,
                            },
                            price: {
                                type: 'number',
                                description: `Price per billing period`,
                                isRequired: true,
                            },
                            currency: {
                                type: 'string',
                                description: `Currency code (e.g., usd, gbp)`,
                                maxLength: 3,
                                minLength: 3,
                            },
                            interval: {
                                type: 'Enum',
                                isRequired: true,
                            },
                            intervalCount: {
                                type: 'number',
                                description: `Number of intervals between billings`,
                            },
                            trialPeriodDays: {
                                type: 'number',
                                description: `Number of trial days`,
                            },
                            features: {
                                type: 'array',
                                contains: {
                                    type: 'string',
                                },
                                isRequired: true,
                            },
                            metadata: {
                                type: 'dictionary',
                                contains: {
                                    properties: {
                                    },
                                },
                            },
                            stripeProductId: {
                                type: 'string',
                                description: `Stripe product ID`,
                            },
                            stripePriceId: {
                                type: 'string',
                                description: `Stripe price ID`,
                            },
                            createdAt: {
                                type: 'string',
                                description: `When the record was created`,
                                isRequired: true,
                                format: 'date-time',
                            },
                            updatedAt: {
                                type: 'string',
                                description: `When the record was last updated`,
                                isRequired: true,
                                format: 'date-time',
                            },
                            isActive: {
                                type: 'boolean',
                                description: `Whether the record is active`,
                            },
                        },
                    },
                },
            },
            isRequired: true,
        },
        pagination: {
            description: `Pagination information`,
            properties: {
                page: {
                    type: 'number',
                    description: `Current page number`,
                    isRequired: true,
                },
                limit: {
                    type: 'number',
                    description: `Items per page`,
                    isRequired: true,
                    maximum: 100,
                },
                total: {
                    type: 'number',
                    description: `Total number of items`,
                    isRequired: true,
                },
                totalPages: {
                    type: 'number',
                    description: `Total number of pages`,
                    isRequired: true,
                },
                hasNext: {
                    type: 'boolean',
                    description: `Whether there is a next page`,
                    isRequired: true,
                },
                hasPrev: {
                    type: 'boolean',
                    description: `Whether there is a previous page`,
                    isRequired: true,
                },
            },
            isRequired: true,
        },
    },
} as const;
