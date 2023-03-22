/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AuthorName = {
    properties: {
        value: {
            type: 'any-of',
            contains: [{
                type: 'AuthorContactInfo',
            }, {
                type: 'string',
            }],
            isRequired: true,
        },
    },
} as const;
