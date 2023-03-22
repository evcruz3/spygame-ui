/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Defines what kind of metadata sbout the sequence is kept.
 *
 * Attributes:
 * region (str): The region from which this sequence originates.
 * collection_date (str): The date the sequence was acquired (?).
 */
export type SequenceMetadata = {
    region?: string;
    collection_date?: string;
};

