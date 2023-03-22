/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SeqId = {
    properties: {
        value: {
            type: 'any-of',
            contains: [{
                type: 'SeqIdPvdLocal',
            }, {
                type: 'SeqIdGenBank',
            }, {
                type: 'SeqIdLocal',
            }, {
                type: 'SeqIdGi',
            }, {
                type: 'SeqIdDdbj',
            }, {
                type: 'SeqIdGisaid',
            }, {
                type: 'SeqIdEmbl',
            }, {
                type: 'SeqIdSwissProt',
            }],
            isRequired: true,
        },
    },
} as const;
