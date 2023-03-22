/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IntFuzz } from './IntFuzz';
import type { SeqId } from './SeqId';
import type { StrandEnum } from './StrandEnum';

export type PackedSeqpt = {
    strand?: StrandEnum;
    id: SeqId;
    fuzz?: IntFuzz;
    points: Array<number>;
};

