/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Bioseq } from './Bioseq';
import type { BioseqSetClassEnum } from './BioseqSetClassEnum';
import type { SeqAnnot } from './SeqAnnot';
import type { SeqDesc } from './SeqDesc';

export type BioseqSet = {
    level?: number;
    set_class: BioseqSetClassEnum;
    release?: string;
    created_date: string;
    descr?: Array<SeqDesc>;
    seq_set: (Array<string> | Array<Bioseq>);
    annot?: Array<SeqAnnot>;
};

