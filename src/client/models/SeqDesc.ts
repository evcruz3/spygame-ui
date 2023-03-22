/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SeqDescComment } from './SeqDescComment';
import type { SeqDescMolInfo } from './SeqDescMolInfo';
import type { SeqDescName } from './SeqDescName';
import type { SeqDescPub } from './SeqDescPub';
import type { SeqDescSource } from './SeqDescSource';
import type { SeqDescTitle } from './SeqDescTitle';

export type SeqDesc = {
    value: (SeqDescName | SeqDescTitle | SeqDescComment | SeqDescMolInfo | SeqDescSource | SeqDescPub);
};

