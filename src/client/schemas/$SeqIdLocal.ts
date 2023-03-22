/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SeqIdLocal = {
    properties: {
        id: {
            type: 'any-of',
            contains: [{
                type: 'number',
            }, {
                type: 'string',
            }],
            isRequired: true,
        },
    },
} as const;
