/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Ext } from './Ext';
import type { RnaRefType } from './RnaRefType';

export type RnaRef = {
    type: RnaRefType;
    pseudo?: boolean;
    ext?: Ext;
};

