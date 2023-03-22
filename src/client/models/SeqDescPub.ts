/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Author } from './Author';
import type { DateStd } from './DateStd';
import type { PubStatusHist } from './PubStatusHist';
import type { SeqDescPubStatusEnum } from './SeqDescPubStatusEnum';

export type SeqDescPub = {
    date?: DateStd;
    title: string;
    journal?: string;
    volume?: string;
    issue?: string;
    pages?: string;
    status: SeqDescPubStatusEnum;
    pubstatushist: Array<PubStatusHist>;
    authors: Array<Author>;
};

