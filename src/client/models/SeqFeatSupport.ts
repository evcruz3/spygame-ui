/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExperimentSupport } from './ExperimentSupport';
import type { InferenceSupport } from './InferenceSupport';
import type { ModelEvidenceSupport } from './ModelEvidenceSupport';

export type SeqFeatSupport = {
    experiment?: ExperimentSupport;
    inference?: InferenceSupport;
    model_evidence?: ModelEvidenceSupport;
};

