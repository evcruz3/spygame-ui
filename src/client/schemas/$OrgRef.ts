/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $OrgRef = {
    properties: {
        taxname: {
            type: 'string',
        },
        common: {
            type: 'string',
        },
        mod: {
            type: 'array',
            contains: {
                type: 'string',
            },
        },
        syn: {
            type: 'array',
            contains: {
                type: 'string',
            },
        },
        orgname: {
            type: 'OrgName',
        },
    },
} as const;
