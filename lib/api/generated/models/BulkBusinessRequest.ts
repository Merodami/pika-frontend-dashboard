/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Get multiple businesses by IDs
 */
export type BulkBusinessRequest = {
    businessIds: Array<string>;
    /**
     * Comma-separated relations: user,category
     */
    include?: string;
};

