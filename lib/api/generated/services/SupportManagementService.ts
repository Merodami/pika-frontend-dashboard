/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SupportManagementService {
    /**
     * List support tickets
     * @returns any List of support tickets
     * @throws ApiError
     */
    public static getAdminSupportTicketList({
        search,
        ticketNumber,
        userId,
        assignedTo,
        status,
        priority,
        type,
        page = 1,
        limit = 20,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        include,
    }: {
        /**
         * Search in title, description
         */
        search?: string,
        ticketNumber?: string,
        userId?: string,
        assignedTo?: string,
        /**
         * Support ticket status
         */
        status?: 'open' | 'assigned' | 'in_progress' | 'waiting_customer' | 'waiting_internal' | 'resolved' | 'closed',
        /**
         * Support ticket priority level
         */
        priority?: 'low' | 'medium' | 'high' | 'urgent' | 'critical',
        /**
         * Support ticket category/type
         */
        type?: 'billing' | 'technical' | 'account' | 'general' | 'bug_report' | 'feature_request',
        page?: number,
        limit?: number,
        /**
         * Field to sort admin tickets by
         */
        sortBy?: 'createdAt' | 'updatedAt' | 'resolvedAt' | 'priority' | 'status',
        /**
         * Sort order - ascending (asc) or descending (desc)
         */
        sortOrder?: 'asc' | 'desc',
        /**
         * Comma-separated relations: user,assignedUser
         */
        include?: string,
    }): CancelablePromise<{
        data: Array<{
            /**
             * Universally Unique Identifier
             */
            id: string;
            ticketNumber?: string;
            userId: string;
            userName: string;
            userEmail: string;
            title: string;
            description: string;
            /**
             * Support ticket category/type
             */
            type: 'billing' | 'technical' | 'account' | 'general' | 'bug_report' | 'feature_request';
            /**
             * Support ticket status
             */
            status: 'open' | 'assigned' | 'in_progress' | 'waiting_customer' | 'waiting_internal' | 'resolved' | 'closed';
            /**
             * Support ticket priority level
             */
            priority: 'low' | 'medium' | 'high' | 'urgent' | 'critical';
            /**
             * ISO 8601 datetime with timezone
             */
            resolvedAt?: string;
            assignedTo?: string;
            assignedToName?: string;
            files?: Array<string>;
            /**
             * When the record was created
             */
            createdAt: string;
            /**
             * When the record was last updated
             */
            updatedAt: string;
        }>;
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/support/tickets',
            query: {
                'search': search,
                'ticketNumber': ticketNumber,
                'userId': userId,
                'assignedTo': assignedTo,
                'status': status,
                'priority': priority,
                'type': type,
                'page': page,
                'limit': limit,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
                'include': include,
            },
        });
    }
    /**
     * Get support ticket details
     * @returns any Support ticket details
     * @throws ApiError
     */
    public static getAdminSupportTicketById({
        id,
    }: {
        id: string,
    }): CancelablePromise<{
        /**
         * Universally Unique Identifier
         */
        id: string;
        ticketNumber?: string;
        userId: string;
        userName: string;
        userEmail: string;
        title: string;
        description: string;
        /**
         * Support ticket category/type
         */
        type: 'billing' | 'technical' | 'account' | 'general' | 'bug_report' | 'feature_request';
        /**
         * Support ticket status
         */
        status: 'open' | 'assigned' | 'in_progress' | 'waiting_customer' | 'waiting_internal' | 'resolved' | 'closed';
        /**
         * Support ticket priority level
         */
        priority: 'low' | 'medium' | 'high' | 'urgent' | 'critical';
        /**
         * ISO 8601 datetime with timezone
         */
        resolvedAt?: string;
        assignedTo?: string;
        assignedToName?: string;
        files?: Array<string>;
        /**
         * When the record was created
         */
        createdAt: string;
        /**
         * When the record was last updated
         */
        updatedAt: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/support/tickets/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update ticket status
     * @returns any Ticket status updated successfully
     * @throws ApiError
     */
    public static updateAdminTicketStatus({
        id,
        requestBody,
    }: {
        /**
         * Ticket ID
         */
        id: string,
        requestBody?: {
            /**
             * Support ticket status
             */
            status: 'open' | 'assigned' | 'in_progress' | 'waiting_customer' | 'waiting_internal' | 'resolved' | 'closed';
            note?: string;
            notifyUser?: boolean;
        },
    }): CancelablePromise<{
        /**
         * Universally Unique Identifier
         */
        id: string;
        ticketNumber?: string;
        userId: string;
        userName: string;
        userEmail: string;
        title: string;
        description: string;
        /**
         * Support ticket category/type
         */
        type: 'billing' | 'technical' | 'account' | 'general' | 'bug_report' | 'feature_request';
        /**
         * Support ticket status
         */
        status: 'open' | 'assigned' | 'in_progress' | 'waiting_customer' | 'waiting_internal' | 'resolved' | 'closed';
        /**
         * Support ticket priority level
         */
        priority: 'low' | 'medium' | 'high' | 'urgent' | 'critical';
        /**
         * ISO 8601 datetime with timezone
         */
        resolvedAt?: string;
        assignedTo?: string;
        assignedToName?: string;
        files?: Array<string>;
        /**
         * When the record was created
         */
        createdAt: string;
        /**
         * When the record was last updated
         */
        updatedAt: string;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/support/tickets/{id}/status',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Assign ticket to agent
     * @returns any Ticket assigned successfully
     * @throws ApiError
     */
    public static assignAdminTicketToAgent({
        id,
        requestBody,
    }: {
        /**
         * Ticket ID
         */
        id: string,
        requestBody?: {
            assigneeId: string;
            note?: string;
            /**
             * Support ticket priority level
             */
            priority?: 'low' | 'medium' | 'high' | 'urgent' | 'critical';
        },
    }): CancelablePromise<{
        /**
         * Universally Unique Identifier
         */
        id: string;
        ticketNumber?: string;
        userId: string;
        userName: string;
        userEmail: string;
        title: string;
        description: string;
        /**
         * Support ticket category/type
         */
        type: 'billing' | 'technical' | 'account' | 'general' | 'bug_report' | 'feature_request';
        /**
         * Support ticket status
         */
        status: 'open' | 'assigned' | 'in_progress' | 'waiting_customer' | 'waiting_internal' | 'resolved' | 'closed';
        /**
         * Support ticket priority level
         */
        priority: 'low' | 'medium' | 'high' | 'urgent' | 'critical';
        /**
         * ISO 8601 datetime with timezone
         */
        resolvedAt?: string;
        assignedTo?: string;
        assignedToName?: string;
        files?: Array<string>;
        /**
         * When the record was created
         */
        createdAt: string;
        /**
         * When the record was last updated
         */
        updatedAt: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/support/tickets/{id}/assign',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * List all problems with admin details
     * @returns any List of problems
     * @throws ApiError
     */
    public static getAdminProblemList({
        search,
        ticketNumber,
        userId,
        assignedTo,
        status,
        priority,
        type,
        page = 1,
        limit = 20,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        include,
    }: {
        /**
         * Search in title, description
         */
        search?: string,
        ticketNumber?: string,
        userId?: string,
        assignedTo?: string,
        /**
         * Support ticket status
         */
        status?: 'open' | 'assigned' | 'in_progress' | 'waiting_customer' | 'waiting_internal' | 'resolved' | 'closed',
        /**
         * Support ticket priority level
         */
        priority?: 'low' | 'medium' | 'high' | 'urgent' | 'critical',
        /**
         * Support ticket category/type
         */
        type?: 'billing' | 'technical' | 'account' | 'general' | 'bug_report' | 'feature_request',
        page?: number,
        limit?: number,
        /**
         * Field to sort admin tickets by
         */
        sortBy?: 'createdAt' | 'updatedAt' | 'resolvedAt' | 'priority' | 'status',
        /**
         * Sort order - ascending (asc) or descending (desc)
         */
        sortOrder?: 'asc' | 'desc',
        /**
         * Comma-separated relations: user,assignedUser
         */
        include?: string,
    }): CancelablePromise<{
        data: Array<{
            /**
             * Universally Unique Identifier
             */
            id: string;
            ticketNumber?: string;
            userId: string;
            userName: string;
            userEmail: string;
            title: string;
            description: string;
            /**
             * Support ticket category/type
             */
            type: 'billing' | 'technical' | 'account' | 'general' | 'bug_report' | 'feature_request';
            /**
             * Support ticket status
             */
            status: 'open' | 'assigned' | 'in_progress' | 'waiting_customer' | 'waiting_internal' | 'resolved' | 'closed';
            /**
             * Support ticket priority level
             */
            priority: 'low' | 'medium' | 'high' | 'urgent' | 'critical';
            /**
             * ISO 8601 datetime with timezone
             */
            resolvedAt?: string;
            assignedTo?: string;
            assignedToName?: string;
            files?: Array<string>;
            /**
             * When the record was created
             */
            createdAt: string;
            /**
             * When the record was last updated
             */
            updatedAt: string;
        }>;
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrevious: boolean;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/problems',
            query: {
                'search': search,
                'ticketNumber': ticketNumber,
                'userId': userId,
                'assignedTo': assignedTo,
                'status': status,
                'priority': priority,
                'type': type,
                'page': page,
                'limit': limit,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
                'include': include,
            },
        });
    }
    /**
     * Get problem details
     * @returns any Problem details
     * @throws ApiError
     */
    public static getAdminProblemById({
        id,
    }: {
        /**
         * Problem ID
         */
        id: string,
    }): CancelablePromise<{
        /**
         * Universally Unique Identifier
         */
        id: string;
        ticketNumber?: string;
        userId: string;
        userName: string;
        userEmail: string;
        title: string;
        description: string;
        /**
         * Support ticket category/type
         */
        type: 'billing' | 'technical' | 'account' | 'general' | 'bug_report' | 'feature_request';
        /**
         * Support ticket status
         */
        status: 'open' | 'assigned' | 'in_progress' | 'waiting_customer' | 'waiting_internal' | 'resolved' | 'closed';
        /**
         * Support ticket priority level
         */
        priority: 'low' | 'medium' | 'high' | 'urgent' | 'critical';
        /**
         * ISO 8601 datetime with timezone
         */
        resolvedAt?: string;
        assignedTo?: string;
        assignedToName?: string;
        files?: Array<string>;
        /**
         * When the record was created
         */
        createdAt: string;
        /**
         * When the record was last updated
         */
        updatedAt: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/problems/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update problem
     * @returns any Problem updated successfully
     * @throws ApiError
     */
    public static updateAdminProblem({
        id,
        requestBody,
    }: {
        /**
         * Problem ID
         */
        id: string,
        requestBody?: {
            title?: string;
            description?: string;
            /**
             * Support ticket priority level
             */
            priority?: 'low' | 'medium' | 'high' | 'urgent' | 'critical';
            /**
             * Support ticket category/type
             */
            type?: 'billing' | 'technical' | 'account' | 'general' | 'bug_report' | 'feature_request';
            /**
             * Support ticket status
             */
            status?: 'open' | 'assigned' | 'in_progress' | 'waiting_customer' | 'waiting_internal' | 'resolved' | 'closed';
            assignedTo?: string;
            /**
             * ISO 8601 datetime with timezone
             */
            resolvedAt?: string;
            files?: Array<string>;
        },
    }): CancelablePromise<{
        /**
         * Universally Unique Identifier
         */
        id: string;
        ticketNumber?: string;
        userId: string;
        userName: string;
        userEmail: string;
        title: string;
        description: string;
        /**
         * Support ticket category/type
         */
        type: 'billing' | 'technical' | 'account' | 'general' | 'bug_report' | 'feature_request';
        /**
         * Support ticket status
         */
        status: 'open' | 'assigned' | 'in_progress' | 'waiting_customer' | 'waiting_internal' | 'resolved' | 'closed';
        /**
         * Support ticket priority level
         */
        priority: 'low' | 'medium' | 'high' | 'urgent' | 'critical';
        /**
         * ISO 8601 datetime with timezone
         */
        resolvedAt?: string;
        assignedTo?: string;
        assignedToName?: string;
        files?: Array<string>;
        /**
         * When the record was created
         */
        createdAt: string;
        /**
         * When the record was last updated
         */
        updatedAt: string;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/problems/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete problem
     * @returns void
     * @throws ApiError
     */
    public static deleteAdminProblem({
        id,
    }: {
        /**
         * Problem ID
         */
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/problems/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * List all comments
     * @returns any List of comments
     * @throws ApiError
     */
    public static getAdminCommentList({
        page,
        limit,
        sortBy,
        sortOrder,
    }: {
        page?: number,
        limit?: number,
        sortBy?: string,
        sortOrder?: 'ASC' | 'DESC',
    }): CancelablePromise<{
        data: Array<any>;
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrevious: boolean;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/comments',
            query: {
                'page': page,
                'limit': limit,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
            },
        });
    }
    /**
     * Create internal comment
     * @returns any Comment created successfully
     * @throws ApiError
     */
    public static postAdminComments({
        requestBody,
    }: {
        requestBody?: {
            /**
             * Universally Unique Identifier
             */
            problemId: string;
            content: string;
            isInternal?: boolean;
        },
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/comments',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get comments by problem ID
     * @returns any List of comments for the problem
     * @throws ApiError
     */
    public static getAdminCommentsByProblemId({
        problemId,
    }: {
        /**
         * Problem ID
         */
        problemId: string,
    }): CancelablePromise<{
        data: Array<any>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/comments/problem/{problemId}',
            path: {
                'problemId': problemId,
            },
        });
    }
    /**
     * Update any comment
     * @returns any Comment updated successfully
     * @throws ApiError
     */
    public static putAdminComments({
        id,
        requestBody,
    }: {
        /**
         * Comment ID
         */
        id: string,
        requestBody?: {
            content: string;
            isInternal?: boolean;
        },
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/comments/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete any comment
     * @returns void
     * @throws ApiError
     */
    public static deleteAdminComments({
        id,
    }: {
        /**
         * Comment ID
         */
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/comments/{id}',
            path: {
                'id': id,
            },
        });
    }
}
