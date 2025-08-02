/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Update multiple businesses at once
 */
export type BulkBusinessUpdateRequest = {
    businessIds: Array<string>;
    updates: {
        active?: boolean;
        verified?: boolean;
        /**
         * Universally Unique Identifier
         */
        categoryId?: string;
    };
};

