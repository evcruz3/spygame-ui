/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RequestableUserRole } from './RequestableUserRole';
import type { RequestState } from './RequestState';
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
export type UserRoleRequest = {
    /**
     * The OIDC User ID of the user
     */
    oidc_user_id: (UserProfileDocument | string);
    _id?: string;
    /**
     * The status of the role request
     */
    status?: RequestState;
    /**
     * The role user is requesting for
     */
    role: RequestableUserRole;
};

