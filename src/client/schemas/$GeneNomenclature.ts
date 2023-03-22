/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GeneNomenclature = {
    properties: {
        status: {
            type: 'GeneNomenclatureStatusEnum',
            isRequired: true,
        },
        symbol: {
            type: 'string',
        },
        name: {
            type: 'string',
        },
    },
} as const;
