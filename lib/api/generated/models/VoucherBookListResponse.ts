/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Paginated response
 */
export type VoucherBookListResponse = {
    /**
     * Page items
     */
    data: Array<{
        /**
         * Universally Unique Identifier
         */
        id: string;
        /**
         * Voucher book title
         */
        title: string;
        /**
         * Book edition (e.g., "January 2024")
         */
        edition?: string | null;
        /**
         * Voucher book type
         */
        bookType: 'monthly' | 'special_edition' | 'regional' | 'seasonal' | 'promotional';
        /**
         * Month for monthly books (1-12)
         */
        month?: number;
        /**
         * Year of publication
         */
        year: number;
        /**
         * Only published books visible to public
         */
        status: 'published';
        /**
         * Total number of pages
         */
        totalPages: number;
        /**
         * When the book was published
         */
        publishedAt?: string | null;
        /**
         * URL of the cover image
         */
        coverImageUrl?: string | null;
        /**
         * URL of the back cover image
         */
        backImageUrl?: string | null;
        /**
         * URL of the generated PDF
         */
        pdfUrl?: string | null;
        /**
         * When the record was created
         */
        createdAt: string;
        /**
         * When the record was last updated
         */
        updatedAt: string;
    }>;
    /**
     * Pagination information
     */
    pagination: {
        /**
         * Current page number
         */
        page: number;
        /**
         * Items per page
         */
        limit: number;
        /**
         * Total number of items
         */
        total: number;
        /**
         * Total number of pages
         */
        totalPages: number;
        /**
         * Whether there is a next page
         */
        hasNext: boolean;
        /**
         * Whether there is a previous page
         */
        hasPrev: boolean;
    };
};

