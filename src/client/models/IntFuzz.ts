/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IntFuzzAlt } from './IntFuzzAlt';
import type { IntFuzzLim } from './IntFuzzLim';
import type { IntFuzzPCT } from './IntFuzzPCT';
import type { IntFuzzPM } from './IntFuzzPM';
import type { IntFuzzRange } from './IntFuzzRange';

export type IntFuzz = {
    value: (IntFuzzPM | IntFuzzRange | IntFuzzPCT | IntFuzzLim | IntFuzzAlt);
};

