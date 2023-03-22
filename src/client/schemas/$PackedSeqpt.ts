/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PackedSeqpt = {
    properties: {
        strand: {
            type: 'StrandEnum',
        },
        id: {
            type: 'SeqId',
            isRequired: true,
        },
        fuzz: {
            type: 'IntFuzz',
        },
        points: {
            type: 'array',
            contains: {
                type: 'number',
            },
            isRequired: true,
        },
    },
} as const;
