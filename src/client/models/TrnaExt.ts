/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SeqLoc } from './SeqLoc';

export type TrnaExt = {
    aa?: string;
    codon?: Array<number>;
    anticodon: SeqLoc;
};

