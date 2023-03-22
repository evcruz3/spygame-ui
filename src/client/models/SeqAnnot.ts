/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AnnotData } from './AnnotData';

export type SeqAnnot = {
    annot_id?: number;
    source?: number;
    name?: string;
    desc?: string;
    data: AnnotData;
};

