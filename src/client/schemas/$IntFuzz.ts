/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $IntFuzz = {
    properties: {
        value: {
            type: 'any-of',
            contains: [{
                type: 'IntFuzzPM',
            }, {
                type: 'IntFuzzRange',
            }, {
                type: 'IntFuzzPCT',
            }, {
                type: 'IntFuzzLim',
            }, {
                type: 'IntFuzzAlt',
            }],
            isRequired: true,
        },
    },
} as const;
