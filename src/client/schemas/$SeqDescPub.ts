/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SeqDescPub = {
    properties: {
        date: {
            type: 'DateStd',
        },
        title: {
            type: 'string',
            isRequired: true,
        },
        journal: {
            type: 'string',
        },
        volume: {
            type: 'string',
        },
        issue: {
            type: 'string',
        },
        pages: {
            type: 'string',
        },
        status: {
            type: 'SeqDescPubStatusEnum',
            isRequired: true,
        },
        pubstatushist: {
            type: 'array',
            contains: {
                type: 'PubStatusHist',
            },
            isRequired: true,
        },
        authors: {
            type: 'array',
            contains: {
                type: 'Author',
            },
            isRequired: true,
        },
    },
} as const;
