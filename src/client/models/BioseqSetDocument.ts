/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Bioseq } from './Bioseq';
import type { BioseqSetClassEnum } from './BioseqSetClassEnum';
import type { SeqAnnot } from './SeqAnnot';
import type { SeqDesc } from './SeqDesc';

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
export type BioseqSetDocument = {
    level?: number;
    set_class: BioseqSetClassEnum;
    release?: string;
    created_date: string;
    descr?: Array<SeqDesc>;
    seq_set: (Array<string> | Array<Bioseq>);
    annot?: Array<SeqAnnot>;
    _id?: string;
};

