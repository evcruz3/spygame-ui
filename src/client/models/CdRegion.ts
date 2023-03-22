/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CodeBreak } from './CodeBreak';
import type { FrameEnum } from './FrameEnum';

export type CdRegion = {
    orf?: boolean;
    frame?: FrameEnum;
    conflict?: boolean;
    gaps?: number;
    mismatch?: number;
    code?: string;
    code_break?: Array<CodeBreak>;
    stop?: number;
};

