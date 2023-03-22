/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SeqAnnot } from './SeqAnnot';
import type { SeqDesc } from './SeqDesc';
import type { SeqId } from './SeqId';
import type { SeqInst } from './SeqInst';

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
export type BioseqDocument = {
    seq_ids: Array<SeqId>;
    descr?: Array<SeqDesc>;
    inst: SeqInst;
    annot?: Array<SeqAnnot>;
    _id?: string;
    accession_no?: string;
};

