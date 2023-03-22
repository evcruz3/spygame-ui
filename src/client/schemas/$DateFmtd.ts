/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $DateFmtd = {
    properties: {
        year: {
            type: 'number',
            isRequired: true,
        },
        month: {
            type: 'number',
            isRequired: true,
        },
        date: {
            type: 'number',
            isRequired: true,
        },
        hour: {
            type: 'number',
            isRequired: true,
        },
        minute: {
            type: 'number',
            isRequired: true,
        },
        second: {
            type: 'number',
            isRequired: true,
        },
        others: {
            type: 'number',
        },
    },
} as const;
