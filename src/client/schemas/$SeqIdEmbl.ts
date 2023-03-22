/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SeqIdEmbl = {
    properties: {
        name: {
            type: 'string',
            isRequired: true,
        },
        accession: {
            type: 'string',
            isRequired: true,
        },
        release: {
            type: 'string',
            isRequired: true,
        },
        version: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;
