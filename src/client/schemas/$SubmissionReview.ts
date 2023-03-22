/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SubmissionReview = {
    properties: {
        validator: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'UserProfileDocument',
            }],
            isRequired: true,
        },
        review_date: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        result: {
            type: 'SubmissionResultEnum',
            isRequired: true,
        },
        comments: {
            type: 'string',
        },
    },
} as const;
