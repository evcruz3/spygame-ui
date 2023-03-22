/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SeqDescMolInfo = {
    properties: {
        biomol: {
            type: 'BiomolEnum',
            isRequired: true,
        },
        tech: {
            type: 'SeqDescTechEnum',
            isRequired: true,
        },
        techexp: {
            type: 'string',
        },
        completeness: {
            type: 'SeqDescCompletenessEnum',
            isRequired: true,
        },
        gbmoltype: {
            type: 'string',
        },
    },
} as const;
