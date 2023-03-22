/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $DateStd = {
    properties: {
        value: {
            type: 'any-of',
            contains: [{
                type: 'DateStr',
            }, {
                type: 'DateFmtd',
            }, {
                type: 'DatePrd',
            }],
            isRequired: true,
        },
    },
} as const;
