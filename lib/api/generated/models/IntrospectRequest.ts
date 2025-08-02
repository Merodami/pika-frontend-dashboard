/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Token introspection request
 */
export type IntrospectRequest = {
    /**
     * Token to validate
     */
    token: string;
    /**
     * Type of authentication token
     */
    tokenTypeHint?: 'accessToken' | 'refreshToken';
};

