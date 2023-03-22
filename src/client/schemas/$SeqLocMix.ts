/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SeqLocMix = {
    properties: {
        location: {
            type: 'array',
            contains: {
                type: 'SeqLoc',
            },
            isRequired: true,
        },
    },
} as const;
