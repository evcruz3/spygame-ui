/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AuthorContactInfo = {
    properties: {
        name: {
            type: 'NameStd',
        },
        email: {
            type: 'string',
        },
        contact: {
            type: 'string',
        },
        affil: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
