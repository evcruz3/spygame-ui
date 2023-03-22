/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GeneRef = {
    properties: {
        locus: {
            type: 'string',
        },
        allele: {
            type: 'string',
        },
        desc: {
            type: 'string',
        },
        maploc: {
            type: 'string',
        },
        pseudo: {
            type: 'boolean',
        },
        syn: {
            type: 'string',
        },
        locus_tag: {
            type: 'string',
        },
        formal_name: {
            type: 'GeneNomenclature',
            isRequired: true,
        },
    },
} as const;
