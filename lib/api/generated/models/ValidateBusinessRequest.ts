/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Validate businesses exist and optionally check if active/verified
 */
export type ValidateBusinessRequest = {
    businessIds: Array<string>;
    checkActive?: boolean;
    checkVerified?: boolean;
};

