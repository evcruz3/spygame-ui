/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $OrgName = {
    properties: {
        name: {
            type: 'OrganismName',
        },
        attrib: {
            type: 'string',
        },
        mod: {
            type: 'array',
            contains: {
                type: 'OrgMod',
            },
        },
        lineage: {
            type: 'string',
        },
        gcode: {
            type: 'number',
        },
        mgcode: {
            type: 'number',
        },
        pgcode: {
            type: 'number',
        },
    },
} as const;
