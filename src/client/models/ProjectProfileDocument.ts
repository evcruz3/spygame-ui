/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserProfileDocument } from './UserProfileDocument';

/**
 * Document Mapping class.
 *
 * Fields:
 *
 * - `id` - MongoDB document ObjectID "_id" field.
 * Mapped to the PydanticObjectId class
 *
 * Inherited from:
 *
 * - Pydantic BaseModel
 * - [UpdateMethods](https://roman-right.github.io/beanie/api/interfaces/#aggregatemethods)
 */
export type ProjectProfileDocument = {
    /**
     * a flag to indicate deletion
     */
    dateDeleted?: string;
    /**
     * The title of the project
     */
    project_title: string;
    /**
     * The initiating insitution of the project
     */
    implementing_institution: string;
    /**
     * The funding institution of the project
     */
    funding_institution: string;
    /**
     * The start date of the project
     */
    project_start_date: string;
    /**
     * The end date of the project
     */
    project_end_date: string;
    /**
     * The user_id of the users working under the project
     */
    user_id: (Array<UserProfileDocument> | Array<string>);
    _id?: string;
};

