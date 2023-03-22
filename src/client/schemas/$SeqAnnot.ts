/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SeqAnnot = {
    properties: {
        annot_id: {
            type: 'number',
        },
        source: {
            type: 'number',
        },
        name: {
            type: 'string',
        },
        desc: {
            type: 'string',
        },
        data: {
            type: 'AnnotData',
            isRequired: true,
        },
    },
} as const;
