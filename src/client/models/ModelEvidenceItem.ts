/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SeqId } from './SeqId';

export type ModelEvidenceItem = {
    id: SeqId;
    exon_count?: number;
    exon_length?: number;
    full_length?: boolean;
    supports_all_exon_combo?: boolean;
};

