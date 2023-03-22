/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PackedSeqInt = {
    properties: {
        location: {
            type: 'array',
            contains: {
                type: 'SeqInterval',
            },
            isRequired: true,
        },
    },
} as const;
