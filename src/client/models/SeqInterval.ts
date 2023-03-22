/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IntFuzz } from './IntFuzz';
import type { SeqId } from './SeqId';
import type { StrandEnum } from './StrandEnum';

export type SeqInterval = {
    start: number;
    end: number;
    strand?: StrandEnum;
    id: SeqId;
    fuzz_from?: IntFuzz;
    fuzz_to?: IntFuzz;
};

