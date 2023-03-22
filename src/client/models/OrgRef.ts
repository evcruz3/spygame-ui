/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrgName } from './OrgName';

export type OrgRef = {
    taxname?: string;
    common?: string;
    mod?: Array<string>;
    syn?: Array<string>;
    orgname?: OrgName;
};

