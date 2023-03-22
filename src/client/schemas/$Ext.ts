/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Ext = {
    properties: {
        value: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'TrnaExt',
            }, {
                type: 'RnaGen',
            }],
            isRequired: true,
        },
    },
} as const;
