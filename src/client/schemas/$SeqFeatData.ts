/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SeqFeatData = {
    properties: {
        value: {
            type: 'any-of',
            contains: [{
                type: 'RnaRef',
            }, {
                type: 'CdRegion',
            }, {
                type: 'GeneRef',
            }, {
                type: 'ProtRef',
            }],
            isRequired: true,
        },
    },
} as const;
