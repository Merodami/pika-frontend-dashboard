/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Validation results for businesses
 */
export type ValidateBusinessResponse = {
    valid: Array<string>;
    invalid: Array<{
        /**
         * Universally Unique Identifier
         */
        id: string;
        reason: string;
    }>;
};

