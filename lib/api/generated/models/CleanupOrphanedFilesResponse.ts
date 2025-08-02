/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Cleanup orphaned files response
 */
export type CleanupOrphanedFilesResponse = {
    filesFound: number;
    filesDeleted: number;
    /**
     * Storage freed in bytes
     */
    storageFreed: number;
    errors: Array<string>;
    dryRun: boolean;
};

