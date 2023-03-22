/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GbQual } from './GbQual';
import type { SeqDescPub } from './SeqDescPub';
import type { SeqFeatData } from './SeqFeatData';
import type { SeqFeatExpEvEnum } from './SeqFeatExpEvEnum';
import type { SeqFeatSupport } from './SeqFeatSupport';
import type { SeqLoc } from './SeqLoc';

export type SeqFeat = {
    feat_id: number;
    data: SeqFeatData;
    partial?: boolean;
    exception?: boolean;
    comment?: string;
    product?: SeqLoc;
    location: SeqLoc;
    qual?: Array<GbQual>;
    title?: string;
    ext?: string;
    cit?: SeqDescPub;
    exp_ev?: SeqFeatExpEvEnum;
    pseudo?: boolean;
    except_text?: boolean;
    ids?: Array<number>;
    exts?: Array<string>;
    support?: SeqFeatSupport;
};

