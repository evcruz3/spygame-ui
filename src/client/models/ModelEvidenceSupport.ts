/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ModelEvidenceItem } from './ModelEvidenceItem';
import type { SeqId } from './SeqId';

export type ModelEvidenceSupport = {
    method?: string;
    mrna?: Array<ModelEvidenceItem>;
    est?: Array<ModelEvidenceItem>;
    protein?: Array<ModelEvidenceItem>;
    identification: SeqId;
    exon_count?: number;
    exon_length?: number;
    full_length?: boolean;
    supports_all_exon_combo?: boolean;
};

