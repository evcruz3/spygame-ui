/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SeqIdDdbj } from './SeqIdDdbj';
import type { SeqIdEmbl } from './SeqIdEmbl';
import type { SeqIdGenBank } from './SeqIdGenBank';
import type { SeqIdGi } from './SeqIdGi';
import type { SeqIdGisaid } from './SeqIdGisaid';
import type { SeqIdLocal } from './SeqIdLocal';
import type { SeqIdPvdLocal } from './SeqIdPvdLocal';
import type { SeqIdSwissProt } from './SeqIdSwissProt';

export type SeqId = {
    value: (SeqIdPvdLocal | SeqIdGenBank | SeqIdLocal | SeqIdGi | SeqIdDdbj | SeqIdGisaid | SeqIdEmbl | SeqIdSwissProt);
};

