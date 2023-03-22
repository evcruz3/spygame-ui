/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InstitutionProfileDocument } from './InstitutionProfileDocument';
import type { UserRole } from './UserRole';

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
export type UserProfileDocument = {
    /**
     * a flag to indicate deletion
     */
    dateDeleted?: string;
    /**
     * The OIDC User ID of the user
     */
    oidc_user_id: string;
    /**
     * The first name of the user.
     */
    first_name: string;
    /**
     * The middle name of the user.
     */
    middle_name?: string;
    /**
     * The last name of the user.
     */
    last_name: string;
    /**
     * The suffix of the user (e.g., Jr., Sr.)
     */
    suffix?: string;
    /**
     * The organization of the user.
     */
    organization?: string;
    /**
     * The department of the user.
     */
    department?: string;
    /**
     * The region of the user.
     */
    region?: string;
    /**
     * The province of the user.
     */
    province?: string;
    /**
     * The province of the user.
     */
    city_municipality?: string;
    /**
     * The street address of the user.
     */
    street_address?: string;
    /**
     * The contact number of the user.
     */
    contact_number: string;
    /**
     * The office number of the user.
     */
    office_number?: string;
    /**
     * The email address of the user.
     */
    email_address: string;
    /**
     * The alternate email address of the user.
     */
    alt_email_address?: string;
    /**
     * The affiliated institution of the user.
     */
    affiliation?: (InstitutionProfileDocument | string);
    /**
     * The current roles the user has in the pvd system
     */
    roles?: Array<UserRole>;
    _id?: string;
};

