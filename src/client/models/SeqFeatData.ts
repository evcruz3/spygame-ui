/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CdRegion } from './CdRegion';
import type { GeneRef } from './GeneRef';
import type { ProtRef } from './ProtRef';
import type { RnaRef } from './RnaRef';

export type SeqFeatData = {
    value: (RnaRef | CdRegion | GeneRef | ProtRef);
};

