/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SeqInst = {
    properties: {
        repr: {
            type: 'SeqInstReprEnum',
            isRequired: true,
        },
        mol: {
            type: 'SeqInstMolEnum',
            isRequired: true,
        },
        length: {
            type: 'number',
        },
        fuzz: {
            type: 'IntFuzz',
        },
        topology: {
            type: 'SeqInstTopologyEnum',
        },
        strand: {
            type: 'SeqInstStrandEnum',
        },
        data: {
            type: 'SeqInstData',
        },
    },
} as const;
