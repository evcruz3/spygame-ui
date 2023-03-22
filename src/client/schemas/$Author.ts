/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Author = {
    properties: {
        author: {
            type: 'AuthorName',
            isRequired: true,
        },
        level: {
            type: 'AuthorLevelEnum',
            isRequired: true,
        },
        role: {
            type: 'AuthorRoleEnum',
            isRequired: true,
        },
        affil: {
            type: 'string',
        },
        is_corr: {
            type: 'boolean',
        },
    },
} as const;
