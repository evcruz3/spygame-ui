/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SequenceMetadataOptional = {
    description: `Defines what kind of metadata sbout the sequence is kept.

    Attributes:
    region (str): The region from which this sequence originates.
    collection_date (str): The date the sequence was acquired (?).`,
    properties: {
        region: {
            type: 'string',
        },
        collection_date: {
            type: 'string',
        },
    },
} as const;
