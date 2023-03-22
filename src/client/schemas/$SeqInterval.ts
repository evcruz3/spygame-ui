/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SeqInterval = {
    properties: {
        start: {
            type: 'number',
            isRequired: true,
        },
        end: {
            type: 'number',
            isRequired: true,
        },
        strand: {
            type: 'StrandEnum',
        },
        id: {
            type: 'SeqId',
            isRequired: true,
        },
        fuzz_from: {
            type: 'IntFuzz',
        },
        fuzz_to: {
            type: 'IntFuzz',
        },
    },
} as const;
