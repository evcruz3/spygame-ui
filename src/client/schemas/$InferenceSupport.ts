/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $InferenceSupport = {
    properties: {
        category: {
            type: 'InferenceSupportCategoryEnum',
        },
        type: {
            type: 'InferenceSupportTypeEnum',
            isRequired: true,
        },
        other_type: {
            type: 'string',
        },
        same_species: {
            type: 'boolean',
        },
        basis: {
            type: 'array',
            contains: {
                type: 'SeqId',
            },
            isRequired: true,
        },
    },
} as const;
