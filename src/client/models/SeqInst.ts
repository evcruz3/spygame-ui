/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IntFuzz } from './IntFuzz';
import type { SeqInstData } from './SeqInstData';
import type { SeqInstMolEnum } from './SeqInstMolEnum';
import type { SeqInstReprEnum } from './SeqInstReprEnum';
import type { SeqInstStrandEnum } from './SeqInstStrandEnum';
import type { SeqInstTopologyEnum } from './SeqInstTopologyEnum';

export type SeqInst = {
    repr: SeqInstReprEnum;
    mol: SeqInstMolEnum;
    length?: number;
    fuzz?: IntFuzz;
    topology?: SeqInstTopologyEnum;
    strand?: SeqInstStrandEnum;
    data?: SeqInstData;
};

