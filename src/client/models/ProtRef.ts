/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProtRefProcessedEnum } from './ProtRefProcessedEnum';

export type ProtRef = {
    name?: Array<string>;
    str?: string;
    ec?: Array<string>;
    activity?: Array<string>;
    processed: ProtRefProcessedEnum;
};

