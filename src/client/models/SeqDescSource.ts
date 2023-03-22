/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrgRef } from './OrgRef';
import type { PcrReaction } from './PcrReaction';
import type { SeqDescSourceGenomeEnum } from './SeqDescSourceGenomeEnum';
import type { SeqDescSourceOriginEnum } from './SeqDescSourceOriginEnum';
import type { Subsource } from './Subsource';

export type SeqDescSource = {
    genome: SeqDescSourceGenomeEnum;
    origin: SeqDescSourceOriginEnum;
    org: OrgRef;
    subtype?: Array<Subsource>;
    is_focus: null;
    pcr_primer?: Array<PcrReaction>;
};

