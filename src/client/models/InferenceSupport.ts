/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InferenceSupportCategoryEnum } from './InferenceSupportCategoryEnum';
import type { InferenceSupportTypeEnum } from './InferenceSupportTypeEnum';
import type { SeqId } from './SeqId';

export type InferenceSupport = {
    category?: InferenceSupportCategoryEnum;
    type: InferenceSupportTypeEnum;
    other_type?: string;
    same_species?: boolean;
    basis: Array<SeqId>;
};

