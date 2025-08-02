/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Business existence check result
 */
export type CheckBusinessExistsResponse = {
    exists: boolean;
    isActive?: boolean;
    isVerified?: boolean;
    /**
     * Internal business data for services
     */
    business?: {
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
    };
};

