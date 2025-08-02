/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Create a new business
 */
export type CreateBusinessRequest = {
    /**
     * User who will own this business
     */
    userId: string;
    /**
     * Business name
     */
    businessName: string;
    /**
     * Business description
     */
    businessDescription?: string;
    /**
     * Category this business belongs to
     */
    categoryId: string;
    /**
     * Whether business is verified
     */
    verified?: boolean;
    /**
     * Whether business is active
     */
    active?: boolean;
};

