/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * User file summary for internal use
 */
export type UserFileSummaryResponse = {
    userId: string;
    totalFiles: number;
    /**
     * Total size in bytes
     */
    totalSize: number;
    filesByType: {
        image?: number;
        video?: number;
        document?: number;
        audio?: number;
        other?: number;
    };
    filesByStatus: {
        pending?: number;
        uploaded?: number;
        processing?: number;
        processed?: number;
        failed?: number;
        deleted?: number;
    };
    /**
     * ISO 8601 datetime with timezone
     */
    oldestFile?: string;
    /**
     * ISO 8601 datetime with timezone
     */
    newestFile?: string;
};

