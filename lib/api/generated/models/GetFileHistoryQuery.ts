/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Query parameters for file history
 */
export type GetFileHistoryQuery = {
    status?: string;
    folder?: string;
    contentType?: string;
    provider?: string;
    /**
     * ISO 8601 datetime with timezone
     */
    fromDate?: string;
    /**
     * ISO 8601 datetime with timezone
     */
    toDate?: string;
    page?: number;
    limit?: number;
    /**
     * Field to sort files by
     */
    sortBy?: 'uploadedAt' | 'fileSize' | 'fileName' | 'createdAt' | 'updatedAt';
    sortOrder?: 'asc' | 'desc';
};

