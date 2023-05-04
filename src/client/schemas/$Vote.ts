/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Vote = {
    properties: {
        player: {
            type: 'any-of',
            description: `The player who voted`,
            contains: [{
                type: 'PlayerDocument',
            }, {
                type: 'string',
            }],
            isRequired: true,
        },
        vote: {
            type: 'any-of',
            description: `The player being voted out`,
            contains: [{
                type: 'PlayerDocument',
            }, {
                type: 'string',
            }],
            isRequired: true,
        },
    },
} as const;
