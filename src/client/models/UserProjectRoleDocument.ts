/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProjectPosition } from './ProjectPosition';
import type { ProjectProfileDocument } from './ProjectProfileDocument';
import type { ProjectRole } from './ProjectRole';
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
export type UserProjectRoleDocument = {
    /**
     * The user's project ID
     */
    project_id: (ProjectProfileDocument | string);
    /**
     * The user's ID
     */
    user_id: (UserProfileDocument | string);
    /**
     * The user's position/role in the project
     */
    position: ProjectPosition;
    /**
     * role access/es of the user in the project
     */
    role?: Array<ProjectRole>;
    /**
     * The user's start date of the project
     */
    startDate: string;
    /**
     * The user's end date of the project
     */
    endDate: string;
    _id?: string;
};

