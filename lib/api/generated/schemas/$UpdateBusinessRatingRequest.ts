/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UpdateBusinessRatingRequest = {
    description: `Update business rating data`,
    properties: {
        rating: {
            type: 'number',
            description: `New rating value for the business`,
            isRequired: true,
            maximum: 5,
        },
    },
} as const;
