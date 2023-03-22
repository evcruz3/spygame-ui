/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SeqLocEquiv = {
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
