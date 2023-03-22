/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SeqLoc = {
    properties: {
        value: {
            type: 'any-of',
            contains: [{
                type: 'NULL',
            }, {
                type: 'Empty',
            }, {
                type: 'Whole',
            }, {
                type: 'SeqInterval',
            }, {
                type: 'PackedSeqInt',
            }, {
                type: 'SeqPoint',
            }, {
                type: 'PackedSeqpt',
            }, {
                type: 'SeqBond',
            }, {
                type: 'SeqLocMix',
            }, {
                type: 'SeqLocEquiv',
            }],
            isRequired: true,
        },
    },
} as const;
