/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $RnaGen = {
    properties: {
        rna_class: {
            type: 'string',
        },
        product: {
            type: 'string',
        },
        quals: {
            type: 'array',
            contains: {
                type: 'RnaQual',
            },
        },
    },
} as const;
