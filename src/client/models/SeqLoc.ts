/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Empty } from './Empty';
import type { NULL } from './NULL';
import type { PackedSeqInt } from './PackedSeqInt';
import type { PackedSeqpt } from './PackedSeqpt';
import type { SeqBond } from './SeqBond';
import type { SeqInterval } from './SeqInterval';
import type { SeqLocEquiv } from './SeqLocEquiv';
import type { SeqLocMix } from './SeqLocMix';
import type { SeqPoint } from './SeqPoint';
import type { Whole } from './Whole';

export type SeqLoc = {
    value: (NULL | Empty | Whole | SeqInterval | PackedSeqInt | SeqPoint | PackedSeqpt | SeqBond | SeqLocMix | SeqLocEquiv);
};

