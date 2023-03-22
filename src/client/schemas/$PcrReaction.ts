/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PcrReaction = {
    properties: {
        forward: {
            type: 'array',
            contains: {
                type: 'PcrPrimer',
            },
        },
        reverse: {
            type: 'array',
            contains: {
                type: 'PcrPrimer',
            },
        },
    },
} as const;
