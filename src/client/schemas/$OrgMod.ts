/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $OrgMod = {
    properties: {
        subtype: {
            type: 'OrgModSubtypeEnum',
            isRequired: true,
        },
        subname: {
            type: 'string',
            isRequired: true,
        },
        attrib: {
            type: 'string',
        },
    },
} as const;
