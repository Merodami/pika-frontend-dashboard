/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AdminVoucherBookListResponse = {
    description: `Paginated response`,
    properties: {
        data: {
            type: 'array',
            contains: {
                description: `Admin voucher book information with full management details`,
                properties: {
                    id: {
                        type: 'string',
                        description: `Universally Unique Identifier`,
                        isRequired: true,
                        format: 'uuid',
                    },
                    title: {
                        type: 'string',
                        description: `Voucher book title`,
                        isRequired: true,
                        maxLength: 255,
                    },
                    edition: {
                        type: 'string',
                        description: `Book edition (e.g., "January 2024")`,
                        maxLength: 100,
                    },
                    bookType: {
                        type: 'Enum',
                        isRequired: true,
                    },
                    month: {
                        type: 'number',
                        description: `Month for monthly books (1-12)`,
                        maximum: 12,
                        minimum: 1,
                    },
                    year: {
                        type: 'number',
                        description: `Year of publication`,
                        isRequired: true,
                        maximum: 2100,
                        minimum: 2020,
                    },
                    status: {
                        type: 'Enum',
                        isRequired: true,
                    },
                    totalPages: {
                        type: 'number',
                        description: `Total number of pages`,
                        isRequired: true,
                        maximum: 100,
                        minimum: 1,
                    },
                    publishedAt: {
                        type: 'string',
                        description: `When the book was published`,
                        format: 'date-time',
                    },
                    coverImageUrl: {
                        type: 'string',
                        description: `URL of the cover image`,
                        format: 'uri',
                    },
                    backImageUrl: {
                        type: 'string',
                        description: `URL of the back cover image`,
                        format: 'uri',
                    },
                    pdfUrl: {
                        type: 'string',
                        description: `URL of the generated PDF`,
                        format: 'uri',
                    },
                    pdfGeneratedAt: {
                        type: 'string',
                        description: `When the PDF was generated`,
                        format: 'date-time',
                    },
                    metadata: {
                        type: 'dictionary',
                        contains: {
                            properties: {
                            },
                        },
                    },
                    createdBy: {
                        type: 'string',
                        description: `User who created the book`,
                        isRequired: true,
                        format: 'uuid',
                    },
                    updatedBy: {
                        type: 'string',
                        description: `User who last updated the book`,
                        format: 'uuid',
                    },
                    pageCount: {
                        type: 'number',
                        description: `Actual number of pages with content`,
                        isRequired: true,
                    },
                    totalPlacements: {
                        type: 'number',
                        description: `Total number of ad placements`,
                        isRequired: true,
                    },
                    distributionCount: {
                        type: 'number',
                        description: `Number of distribution records`,
                        isRequired: true,
                    },
                    createdAt: {
                        type: 'string',
                        description: `When the record was created`,
                        isRequired: true,
                        format: 'date-time',
                    },
                    updatedAt: {
                        type: 'string',
                        description: `When the record was last updated`,
                        isRequired: true,
                        format: 'date-time',
                    },
                },
            },
            isRequired: true,
        },
        pagination: {
            description: `Pagination information`,
            properties: {
                page: {
                    type: 'number',
                    description: `Current page number`,
                    isRequired: true,
                },
                limit: {
                    type: 'number',
                    description: `Items per page`,
                    isRequired: true,
                    maximum: 100,
                },
                total: {
                    type: 'number',
                    description: `Total number of items`,
                    isRequired: true,
                },
                totalPages: {
                    type: 'number',
                    description: `Total number of pages`,
                    isRequired: true,
                },
                hasNext: {
                    type: 'boolean',
                    description: `Whether there is a next page`,
                    isRequired: true,
                },
                hasPrev: {
                    type: 'boolean',
                    description: `Whether there is a previous page`,
                    isRequired: true,
                },
            },
            isRequired: true,
        },
    },
} as const;
