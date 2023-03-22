/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrganismName } from './OrganismName';
import type { OrgMod } from './OrgMod';

export type OrgName = {
    name?: OrganismName;
    attrib?: string;
    mod?: Array<OrgMod>;
    lineage?: string;
    gcode?: number;
    mgcode?: number;
    pgcode?: number;
};

