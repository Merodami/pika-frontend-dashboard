/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Businesses data with not found IDs
 */
export type BulkBusinessResponse = {
    businesses: Array<{
        /**
         * Universally Unique Identifier
         */
        id: string;
        userId: string;
        businessNameKey: string;
        businessDescriptionKey?: string;
        /**
         * Universally Unique Identifier
         */
        categoryId: string;
        verified: boolean;
        active: boolean;
        avgRating: number;
    }>;
    notFound?: Array<string>;
};

