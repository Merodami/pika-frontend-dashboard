/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PdfDownloadResponse = {
    description: `PDF download information`,
    properties: {
        url: {
            type: 'string',
            description: `Download URL for the PDF`,
            isRequired: true,
            format: 'uri',
        },
        filename: {
            type: 'string',
            description: `Suggested filename for download`,
            isRequired: true,
        },
        contentType: {
            type: 'string',
            description: `MIME type`,
        },
        size: {
            type: 'number',
            description: `File size in bytes`,
        },
        generatedAt: {
            type: 'string',
            description: `When the PDF was generated`,
            isRequired: true,
            format: 'date-time',
        },
    },
} as const;
