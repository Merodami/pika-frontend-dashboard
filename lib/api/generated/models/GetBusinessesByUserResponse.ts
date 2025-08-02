/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * User businesses data
 */
export type GetBusinessesByUserResponse = {
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
    totalCount: number;
};

