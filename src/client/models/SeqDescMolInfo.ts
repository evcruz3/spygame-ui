/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BiomolEnum } from './BiomolEnum';
import type { SeqDescCompletenessEnum } from './SeqDescCompletenessEnum';
import type { SeqDescTechEnum } from './SeqDescTechEnum';

export type SeqDescMolInfo = {
    biomol: BiomolEnum;
    tech: SeqDescTechEnum;
    techexp?: string;
    completeness: SeqDescCompletenessEnum;
    gbmoltype?: string;
};

