/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SeqDescSource = {
    properties: {
        genome: {
            type: 'SeqDescSourceGenomeEnum',
            isRequired: true,
        },
        origin: {
            type: 'SeqDescSourceOriginEnum',
            isRequired: true,
        },
        org: {
            type: 'OrgRef',
            isRequired: true,
        },
        subtype: {
            type: 'array',
            contains: {
                type: 'Subsource',
            },
        },
        is_focus: {
            type: 'null',
            isRequired: true,
        },
        pcr_primer: {
            type: 'array',
            contains: {
                type: 'PcrReaction',
            },
        },
    },
} as const;
