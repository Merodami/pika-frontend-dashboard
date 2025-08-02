/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Category hierarchy for internal use
 */
export type InternalCategoryHierarchyResponse = {
    data: Array<{
        /**
         * Universally Unique Identifier
         */
        id: string;
        nameKey: string;
        descriptionKey?: string;
        icon?: string;
        /**
         * Universally Unique Identifier
         */
        parentId?: string;
        isActive: boolean;
        sortOrder: number;
    }>;
};

