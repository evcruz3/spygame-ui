/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AuthorLevelEnum } from './AuthorLevelEnum';
import type { AuthorName } from './AuthorName';
import type { AuthorRoleEnum } from './AuthorRoleEnum';

export type Author = {
    author: AuthorName;
    level: AuthorLevelEnum;
    role: AuthorRoleEnum;
    affil?: string;
    is_corr?: boolean;
};

