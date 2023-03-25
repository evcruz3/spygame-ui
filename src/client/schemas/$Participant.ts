/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Participant = {
    properties: {
        player: {
            type: 'any-of',
            description: `The player's id/profile`,
            contains: [{
                type: 'PlayerDocument',
            }, {
                type: 'string',
            }],
            isRequired: true,
        },
        status: {
            type: 'all-of',
            description: `the state of the player with respect to the task`,
            contains: [{
                type: 'ParticipantStatusEnum',
            }],
            isRequired: true,
        },
    },
} as const;
