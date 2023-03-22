/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $TrnaExt = {
    properties: {
        aa: {
            type: 'string',
        },
        codon: {
            type: 'array',
            contains: {
                type: 'number',
            },
        },
        anticodon: {
            type: 'SeqLoc',
            isRequired: true,
        },
    },
} as const;
