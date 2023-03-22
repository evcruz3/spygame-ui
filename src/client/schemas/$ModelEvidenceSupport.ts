/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ModelEvidenceSupport = {
    properties: {
        method: {
            type: 'string',
        },
        mrna: {
            type: 'array',
            contains: {
                type: 'ModelEvidenceItem',
            },
        },
        est: {
            type: 'array',
            contains: {
                type: 'ModelEvidenceItem',
            },
        },
        protein: {
            type: 'array',
            contains: {
                type: 'ModelEvidenceItem',
            },
        },
        identification: {
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
