/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class HealthService {
    /**
     * Service health check
     * @returns any Service is healthy
     * @throws ApiError
     */
    public static getInternalServiceHealth(): CancelablePromise<{
        status: 'healthy' | 'degraded' | 'unhealthy';
        /**
         * Service URL
         */
        url: string;
        /**
         * Response time in milliseconds
         */
        responseTime: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/health',
        });
    }
}
