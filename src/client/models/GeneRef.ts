/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GeneNomenclature } from './GeneNomenclature';

export type GeneRef = {
    locus?: string;
    allele?: string;
    desc?: string;
    maploc?: string;
    pseudo?: boolean;
    syn?: string;
    locus_tag?: string;
    formal_name: GeneNomenclature;
};

