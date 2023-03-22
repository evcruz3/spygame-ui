/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ModelEvidenceItem = {
    properties: {
        id: {
            type: 'SeqId',
            isRequired: true,
        },
        exon_count: {
            type: 'number',
        },
        exon_length: {
            type: 'number',
        },
        full_length: {
            type: 'boolean',
        },
        supports_all_exon_combo: {
            type: 'boolean',
        },
    },
} as const;
