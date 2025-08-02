/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WebhooksService {
    /**
     * Handle Stripe webhook events
     * Endpoint for receiving Stripe webhook events. Uses signature verification instead of JWT authentication.
     * @returns any Webhook processed successfully
     * @throws ApiError
     */
    public static handleStripeWebhook({
        stripeSignature,
        requestBody,
    }: {
        /**
         * Stripe webhook signature for request validation
         */
        stripeSignature: string,
        requestBody?: ({
            id: string;
            type: 'payment_intent.succeeded';
            data: {
                objectData: {
                    id: string;
                    objectType: 'payment_intent';
                    amount: number;
                    currency: string;
                    customer: string | null;
                    metadata?: Record<string, string>;
                    status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'requires_capture' | 'canceled' | 'succeeded';
                    created: number;
                };
            };
            created: number;
            livemode: boolean;
            pending_webhooks: number;
            request: any | null;
        } | {
            id: string;
            type: 'payment_intent.payment_failed';
            data: {
                objectData: {
                    id: string;
                    objectType: 'payment_intent';
                    amount: number;
                    currency: string;
                    customer: string | null;
                    metadata?: Record<string, string>;
                    status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'requires_capture' | 'canceled' | 'succeeded';
                    created: number;
                };
            };
            created: number;
            livemode: boolean;
            pending_webhooks: number;
            request: any | null;
        } | {
            id: string;
            type: 'payment_intent.canceled';
            data: {
                objectData: {
                    id: string;
                    objectType: 'payment_intent';
                    amount: number;
                    currency: string;
                    customer: string | null;
                    metadata?: Record<string, string>;
                    status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'requires_capture' | 'canceled' | 'succeeded';
                    created: number;
                };
            };
            created: number;
            livemode: boolean;
            pending_webhooks: number;
            request: any | null;
        } | {
            id: string;
            type: 'customer.subscription.created';
            data: {
                objectData: {
                    id: string;
                    objectType: 'subscription';
                    customer: string;
                    status: 'active' | 'past_due' | 'unpaid' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'trialing';
                    current_period_start: number;
                    current_period_end: number;
                    metadata?: Record<string, string>;
                };
            };
            created: number;
            livemode: boolean;
            pending_webhooks: number;
            request: any | null;
        } | {
            id: string;
            type: 'customer.subscription.updated';
            data: {
                objectData: {
                    id: string;
                    objectType: 'subscription';
                    customer: string;
                    status: 'active' | 'past_due' | 'unpaid' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'trialing';
                    current_period_start: number;
                    current_period_end: number;
                    metadata?: Record<string, string>;
                };
            };
            created: number;
            livemode: boolean;
            pending_webhooks: number;
            request: any | null;
        } | {
            id: string;
            type: 'customer.subscription.deleted';
            data: {
                objectData: {
                    id: string;
                    objectType: 'subscription';
                    customer: string;
                    status: 'active' | 'past_due' | 'unpaid' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'trialing';
                    current_period_start: number;
                    current_period_end: number;
                    metadata?: Record<string, string>;
                };
            };
            created: number;
            livemode: boolean;
            pending_webhooks: number;
            request: any | null;
        } | {
            id: string;
            type: 'invoice.payment_succeeded';
            data: {
                objectData: {
                    id: string;
                    objectType: 'invoice';
                    customer: string;
                    subscription: string | null;
                    amount_paid: number;
                    amount_due: number;
                    currency: string;
                    status: 'draft' | 'open' | 'paid' | 'uncollectible' | 'void';
                    metadata?: Record<string, string>;
                };
            };
            created: number;
            livemode: boolean;
            pending_webhooks: number;
            request: any | null;
        } | {
            id: string;
            type: 'invoice.payment_failed';
            data: {
                objectData: {
                    id: string;
                    objectType: 'invoice';
                    customer: string;
                    subscription: string | null;
                    amount_paid: number;
                    amount_due: number;
                    currency: string;
                    status: 'draft' | 'open' | 'paid' | 'uncollectible' | 'void';
                    metadata?: Record<string, string>;
                };
            };
            created: number;
            livemode: boolean;
            pending_webhooks: number;
            request: any | null;
        } | {
            id: string;
            type: 'checkout.session.completed';
            data: {
                objectData: {
                    id: string;
                    objectType: 'checkout.session';
                    customer: string | null;
                    payment_intent: string | null;
                    subscription: string | null;
                    amount_total: number | null;
                    currency: string | null;
                    metadata?: Record<string, string>;
                    payment_status: 'paid' | 'unpaid' | 'no_payment_required';
                };
            };
            created: number;
            livemode: boolean;
            pending_webhooks: number;
            request: any | null;
        } | {
            id: string;
            type: 'checkout.session.expired';
            data: {
                objectData: {
                    id: string;
                    objectType: 'checkout.session';
                    customer: string | null;
                    payment_intent: string | null;
                    subscription: string | null;
                    amount_total: number | null;
                    currency: string | null;
                    metadata?: Record<string, string>;
                    payment_status: 'paid' | 'unpaid' | 'no_payment_required';
                };
            };
            created: number;
            livemode: boolean;
            pending_webhooks: number;
            request: any | null;
        }),
    }): CancelablePromise<{
        received?: boolean;
        eventId?: string;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/webhooks/stripe',
            headers: {
                'stripe-signature': stripeSignature,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid webhook signature or payload`,
                500: `Webhook processing error`,
            },
        });
    }
}
