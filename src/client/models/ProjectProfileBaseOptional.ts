/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserProfileDocument } from './UserProfileDocument';

export type ProjectProfileBaseOptional = {
    project_title?: string;
    implementing_institution?: string;
    funding_institution?: string;
    project_start_date?: string;
    project_end_date?: string;
    user_id?: (Array<UserProfileDocument> | Array<string>);
};

