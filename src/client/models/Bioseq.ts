/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SeqAnnot } from './SeqAnnot';
import type { SeqDesc } from './SeqDesc';
import type { SeqId } from './SeqId';
import type { SeqInst } from './SeqInst';

export type Bioseq = {
    seq_ids: Array<SeqId>;
    descr?: Array<SeqDesc>;
    inst: SeqInst;
    annot?: Array<SeqAnnot>;
};

