/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SeqPoint = {
    properties: {
        point: {
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
        fuzz: {
            type: 'IntFuzz',
        },
    },
} as const;
