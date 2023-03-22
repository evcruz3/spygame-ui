/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SeqDesc = {
    properties: {
        value: {
            type: 'any-of',
            contains: [{
                type: 'SeqDescName',
            }, {
                type: 'SeqDescTitle',
            }, {
                type: 'SeqDescComment',
            }, {
                type: 'SeqDescMolInfo',
            }, {
                type: 'SeqDescSource',
            }, {
                type: 'SeqDescPub',
            }],
            isRequired: true,
        },
    },
} as const;
