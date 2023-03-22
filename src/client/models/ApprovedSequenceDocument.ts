/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SequenceMetadata } from './SequenceMetadata';

/**
 * Document Mapping class.
 *
 * Fields:
 *
 * - `id` - MongoDB document ObjectID "_id" field.
 * Mapped to the PydanticObjectId class
 *
 * Inherited from:
 *
 * - Pydantic BaseModel
 * - [UpdateMethods](https://roman-right.github.io/beanie/api/interfaces/#aggregatemethods)
 */
export type ApprovedSequenceDocument = {
    /**
     * PVD accession number
     */
    accession_no?: string;
    /**
     * The title of the sequence.
     */
    title: string;
    /**
     * The sequence.
     */
    sequence: string;
    /**
     * Sequence metadata
     */
    metadata: SequenceMetadata;
    /**
     * Time of creation
     */
    time_created?: string;
    /**
     * Time of latest update
     */
    time_last_updated?: string;
    _id?: string;
    /**
     * Time of approval
     */
    time_approved?: string;
};

