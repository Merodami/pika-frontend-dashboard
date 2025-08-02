/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Check if user can upload file within quota
 */
export type CheckUserQuotaRequest = {
    userId: string;
    fileSize: number;
    /**
     * File type category
     */
    fileType?: 'image' | 'video' | 'document' | 'audio' | 'other';
};

