/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SeqFeat = {
    properties: {
        feat_id: {
            type: 'number',
            isRequired: true,
        },
        data: {
            type: 'SeqFeatData',
            isRequired: true,
        },
        partial: {
            type: 'boolean',
        },
        exception: {
            type: 'boolean',
        },
        comment: {
            type: 'string',
        },
        product: {
            type: 'SeqLoc',
        },
        location: {
            type: 'SeqLoc',
            isRequired: true,
        },
        qual: {
            type: 'array',
            contains: {
                type: 'GbQual',
            },
        },
        title: {
            type: 'string',
        },
        ext: {
            type: 'string',
        },
        cit: {
            type: 'SeqDescPub',
        },
        exp_ev: {
            type: 'SeqFeatExpEvEnum',
        },
        pseudo: {
            type: 'boolean',
        },
        except_text: {
            type: 'boolean',
        },
        ids: {
            type: 'array',
            contains: {
                type: 'number',
            },
        },
        exts: {
            type: 'array',
            contains: {
                type: 'string',
            },
        },
        support: {
            type: 'SeqFeatSupport',
        },
    },
} as const;
