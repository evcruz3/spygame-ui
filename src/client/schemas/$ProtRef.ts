/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ProtRef = {
    properties: {
        name: {
            type: 'array',
            contains: {
                type: 'string',
            },
        },
        str: {
            type: 'string',
        },
        ec: {
            type: 'array',
            contains: {
                type: 'string',
            },
        },
        activity: {
            type: 'array',
            contains: {
                type: 'string',
            },
        },
        processed: {
            type: 'ProtRefProcessedEnum',
            isRequired: true,
        },
    },
} as const;
