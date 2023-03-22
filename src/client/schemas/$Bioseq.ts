/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Bioseq = {
    properties: {
        seq_ids: {
            type: 'array',
            contains: {
                type: 'SeqId',
            },
            isRequired: true,
        },
        descr: {
            type: 'array',
            contains: {
                type: 'SeqDesc',
            },
        },
        inst: {
            type: 'SeqInst',
            isRequired: true,
        },
        annot: {
            type: 'array',
            contains: {
                type: 'SeqAnnot',
            },
        },
    },
} as const;
