/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $StripeWebhookEvent = {
    type: 'one-of',
    contains: [{
        properties: {
            id: {
                type: 'string',
                isRequired: true,
            },
            type: {
                type: 'Enum',
                isRequired: true,
            },
            data: {
                properties: {
                    objectData: {
                        properties: {
                            id: {
                                type: 'string',
                                isRequired: true,
                            },
                            objectType: {
                                type: 'Enum',
                                isRequired: true,
                            },
                            amount: {
                                type: 'number',
                                isRequired: true,
                            },
                            currency: {
                                type: 'string',
                                isRequired: true,
                                maxLength: 3,
                                minLength: 3,
                            },
                            customer: {
                                type: 'string',
                                isRequired: true,
                                isNullable: true,
                            },
                            metadata: {
                                type: 'dictionary',
                                contains: {
                                    type: 'string',
                                },
                            },
                            status: {
                                type: 'Enum',
                                isRequired: true,
                            },
                            created: {
                                type: 'number',
                                isRequired: true,
                            },
                        },
                        isRequired: true,
                    },
                },
                isRequired: true,
            },
            created: {
                type: 'number',
                isRequired: true,
            },
            livemode: {
                type: 'boolean',
                isRequired: true,
            },
            pending_webhooks: {
                type: 'number',
                isRequired: true,
            },
            request: {
                type: 'any',
                isRequired: true,
                isNullable: true,
            },
        },
    }, {
        properties: {
            id: {
                type: 'string',
                isRequired: true,
            },
            type: {
                type: 'Enum',
                isRequired: true,
            },
            data: {
                properties: {
                    objectData: {
                        properties: {
                            id: {
                                type: 'string',
                                isRequired: true,
                            },
                            objectType: {
                                type: 'Enum',
                                isRequired: true,
                            },
                            amount: {
                                type: 'number',
                                isRequired: true,
                            },
                            currency: {
                                type: 'string',
                                isRequired: true,
                                maxLength: 3,
                                minLength: 3,
                            },
                            customer: {
                                type: 'string',
                                isRequired: true,
                                isNullable: true,
                            },
                            metadata: {
                                type: 'dictionary',
                                contains: {
                                    type: 'string',
                                },
                            },
                            status: {
                                type: 'Enum',
                                isRequired: true,
                            },
                            created: {
                                type: 'number',
                                isRequired: true,
                            },
                        },
                        isRequired: true,
                    },
                },
                isRequired: true,
            },
            created: {
                type: 'number',
                isRequired: true,
            },
            livemode: {
                type: 'boolean',
                isRequired: true,
            },
            pending_webhooks: {
                type: 'number',
                isRequired: true,
            },
            request: {
                type: 'any',
                isRequired: true,
                isNullable: true,
            },
        },
    }, {
        properties: {
            id: {
                type: 'string',
                isRequired: true,
            },
            type: {
                type: 'Enum',
                isRequired: true,
            },
            data: {
                properties: {
                    objectData: {
                        properties: {
                            id: {
                                type: 'string',
                                isRequired: true,
                            },
                            objectType: {
                                type: 'Enum',
                                isRequired: true,
                            },
                            amount: {
                                type: 'number',
                                isRequired: true,
                            },
                            currency: {
                                type: 'string',
                                isRequired: true,
                                maxLength: 3,
                                minLength: 3,
                            },
                            customer: {
                                type: 'string',
                                isRequired: true,
                                isNullable: true,
                            },
                            metadata: {
                                type: 'dictionary',
                                contains: {
                                    type: 'string',
                                },
                            },
                            status: {
                                type: 'Enum',
                                isRequired: true,
                            },
                            created: {
                                type: 'number',
                                isRequired: true,
                            },
                        },
                        isRequired: true,
                    },
                },
                isRequired: true,
            },
            created: {
                type: 'number',
                isRequired: true,
            },
            livemode: {
                type: 'boolean',
                isRequired: true,
            },
            pending_webhooks: {
                type: 'number',
                isRequired: true,
            },
            request: {
                type: 'any',
                isRequired: true,
                isNullable: true,
            },
        },
    }, {
        properties: {
            id: {
                type: 'string',
                isRequired: true,
            },
            type: {
                type: 'Enum',
                isRequired: true,
            },
            data: {
                properties: {
                    objectData: {
                        properties: {
                            id: {
                                type: 'string',
                                isRequired: true,
                            },
                            objectType: {
                                type: 'Enum',
                                isRequired: true,
                            },
                            customer: {
                                type: 'string',
                                isRequired: true,
                            },
                            status: {
                                type: 'Enum',
                                isRequired: true,
                            },
                            current_period_start: {
                                type: 'number',
                                isRequired: true,
                            },
                            current_period_end: {
                                type: 'number',
                                isRequired: true,
                            },
                            metadata: {
                                type: 'dictionary',
                                contains: {
                                    type: 'string',
                                },
                            },
                        },
                        isRequired: true,
                    },
                },
                isRequired: true,
            },
            created: {
                type: 'number',
                isRequired: true,
            },
            livemode: {
                type: 'boolean',
                isRequired: true,
            },
            pending_webhooks: {
                type: 'number',
                isRequired: true,
            },
            request: {
                type: 'any',
                isRequired: true,
                isNullable: true,
            },
        },
    }, {
        properties: {
            id: {
                type: 'string',
                isRequired: true,
            },
            type: {
                type: 'Enum',
                isRequired: true,
            },
            data: {
                properties: {
                    objectData: {
                        properties: {
                            id: {
                                type: 'string',
                                isRequired: true,
                            },
                            objectType: {
                                type: 'Enum',
                                isRequired: true,
                            },
                            customer: {
                                type: 'string',
                                isRequired: true,
                            },
                            status: {
                                type: 'Enum',
                                isRequired: true,
                            },
                            current_period_start: {
                                type: 'number',
                                isRequired: true,
                            },
                            current_period_end: {
                                type: 'number',
                                isRequired: true,
                            },
                            metadata: {
                                type: 'dictionary',
                                contains: {
                                    type: 'string',
                                },
                            },
                        },
                        isRequired: true,
                    },
                },
                isRequired: true,
            },
            created: {
                type: 'number',
                isRequired: true,
            },
            livemode: {
                type: 'boolean',
                isRequired: true,
            },
            pending_webhooks: {
                type: 'number',
                isRequired: true,
            },
            request: {
                type: 'any',
                isRequired: true,
                isNullable: true,
            },
        },
    }, {
        properties: {
            id: {
                type: 'string',
                isRequired: true,
            },
            type: {
                type: 'Enum',
                isRequired: true,
            },
            data: {
                properties: {
                    objectData: {
                        properties: {
                            id: {
                                type: 'string',
                                isRequired: true,
                            },
                            objectType: {
                                type: 'Enum',
                                isRequired: true,
                            },
                            customer: {
                                type: 'string',
                                isRequired: true,
                            },
                            status: {
                                type: 'Enum',
                                isRequired: true,
                            },
                            current_period_start: {
                                type: 'number',
                                isRequired: true,
                            },
                            current_period_end: {
                                type: 'number',
                                isRequired: true,
                            },
                            metadata: {
                                type: 'dictionary',
                                contains: {
                                    type: 'string',
                                },
                            },
                        },
                        isRequired: true,
                    },
                },
                isRequired: true,
            },
            created: {
                type: 'number',
                isRequired: true,
            },
            livemode: {
                type: 'boolean',
                isRequired: true,
            },
            pending_webhooks: {
                type: 'number',
                isRequired: true,
            },
            request: {
                type: 'any',
                isRequired: true,
                isNullable: true,
            },
        },
    }, {
        properties: {
            id: {
                type: 'string',
                isRequired: true,
            },
            type: {
                type: 'Enum',
                isRequired: true,
            },
            data: {
                properties: {
                    objectData: {
                        properties: {
                            id: {
                                type: 'string',
                                isRequired: true,
                            },
                            objectType: {
                                type: 'Enum',
                                isRequired: true,
                            },
                            customer: {
                                type: 'string',
                                isRequired: true,
                            },
                            subscription: {
                                type: 'string',
                                isRequired: true,
                                isNullable: true,
                            },
                            amount_paid: {
                                type: 'number',
                                isRequired: true,
                            },
                            amount_due: {
                                type: 'number',
                                isRequired: true,
                            },
                            currency: {
                                type: 'string',
                                isRequired: true,
                                maxLength: 3,
                                minLength: 3,
                            },
                            status: {
                                type: 'Enum',
                                isRequired: true,
                            },
                            metadata: {
                                type: 'dictionary',
                                contains: {
                                    type: 'string',
                                },
                            },
                        },
                        isRequired: true,
                    },
                },
                isRequired: true,
            },
            created: {
                type: 'number',
                isRequired: true,
            },
            livemode: {
                type: 'boolean',
                isRequired: true,
            },
            pending_webhooks: {
                type: 'number',
                isRequired: true,
            },
            request: {
                type: 'any',
                isRequired: true,
                isNullable: true,
            },
        },
    }, {
        properties: {
            id: {
                type: 'string',
                isRequired: true,
            },
            type: {
                type: 'Enum',
                isRequired: true,
            },
            data: {
                properties: {
                    objectData: {
                        properties: {
                            id: {
                                type: 'string',
                                isRequired: true,
                            },
                            objectType: {
                                type: 'Enum',
                                isRequired: true,
                            },
                            customer: {
                                type: 'string',
                                isRequired: true,
                            },
                            subscription: {
                                type: 'string',
                                isRequired: true,
                                isNullable: true,
                            },
                            amount_paid: {
                                type: 'number',
                                isRequired: true,
                            },
                            amount_due: {
                                type: 'number',
                                isRequired: true,
                            },
                            currency: {
                                type: 'string',
                                isRequired: true,
                                maxLength: 3,
                                minLength: 3,
                            },
                            status: {
                                type: 'Enum',
                                isRequired: true,
                            },
                            metadata: {
                                type: 'dictionary',
                                contains: {
                                    type: 'string',
                                },
                            },
                        },
                        isRequired: true,
                    },
                },
                isRequired: true,
            },
            created: {
                type: 'number',
                isRequired: true,
            },
            livemode: {
                type: 'boolean',
                isRequired: true,
            },
            pending_webhooks: {
                type: 'number',
                isRequired: true,
            },
            request: {
                type: 'any',
                isRequired: true,
                isNullable: true,
            },
        },
    }, {
        properties: {
            id: {
                type: 'string',
                isRequired: true,
            },
            type: {
                type: 'Enum',
                isRequired: true,
            },
            data: {
                properties: {
                    objectData: {
                        properties: {
                            id: {
                                type: 'string',
                                isRequired: true,
                            },
                            objectType: {
                                type: 'Enum',
                                isRequired: true,
                            },
                            customer: {
                                type: 'string',
                                isRequired: true,
                                isNullable: true,
                            },
                            payment_intent: {
                                type: 'string',
                                isRequired: true,
                                isNullable: true,
                            },
                            subscription: {
                                type: 'string',
                                isRequired: true,
                                isNullable: true,
                            },
                            amount_total: {
                                type: 'number',
                                isRequired: true,
                                isNullable: true,
                            },
                            currency: {
                                type: 'string',
                                isRequired: true,
                                isNullable: true,
                                maxLength: 3,
                                minLength: 3,
                            },
                            metadata: {
                                type: 'dictionary',
                                contains: {
                                    type: 'string',
                                },
                            },
                            payment_status: {
                                type: 'Enum',
                                isRequired: true,
                            },
                        },
                        isRequired: true,
                    },
                },
                isRequired: true,
            },
            created: {
                type: 'number',
                isRequired: true,
            },
            livemode: {
                type: 'boolean',
                isRequired: true,
            },
            pending_webhooks: {
                type: 'number',
                isRequired: true,
            },
            request: {
                type: 'any',
                isRequired: true,
                isNullable: true,
            },
        },
    }, {
        properties: {
            id: {
                type: 'string',
                isRequired: true,
            },
            type: {
                type: 'Enum',
                isRequired: true,
            },
            data: {
                properties: {
                    objectData: {
                        properties: {
                            id: {
                                type: 'string',
                                isRequired: true,
                            },
                            objectType: {
                                type: 'Enum',
                                isRequired: true,
                            },
                            customer: {
                                type: 'string',
                                isRequired: true,
                                isNullable: true,
                            },
                            payment_intent: {
                                type: 'string',
                                isRequired: true,
                                isNullable: true,
                            },
                            subscription: {
                                type: 'string',
                                isRequired: true,
                                isNullable: true,
                            },
                            amount_total: {
                                type: 'number',
                                isRequired: true,
                                isNullable: true,
                            },
                            currency: {
                                type: 'string',
                                isRequired: true,
                                isNullable: true,
                                maxLength: 3,
                                minLength: 3,
                            },
                            metadata: {
                                type: 'dictionary',
                                contains: {
                                    type: 'string',
                                },
                            },
                            payment_status: {
                                type: 'Enum',
                                isRequired: true,
                            },
                        },
                        isRequired: true,
                    },
                },
                isRequired: true,
            },
            created: {
                type: 'number',
                isRequired: true,
            },
            livemode: {
                type: 'boolean',
                isRequired: true,
            },
            pending_webhooks: {
                type: 'number',
                isRequired: true,
            },
            request: {
                type: 'any',
                isRequired: true,
                isNullable: true,
            },
        },
    }],
} as const;
