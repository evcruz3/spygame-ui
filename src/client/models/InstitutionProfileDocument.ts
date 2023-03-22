/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

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
export type InstitutionProfileDocument = {
    /**
     * a flag to indicate deletion
     */
    dateDeleted?: string;
    /**
     * The name of the institution
     */
    institution_name: string;
    /**
     * The address of the institution
     */
    institution_address: string;
    /**
     * The E-mail Address of the institution
     */
    email: string;
    /**
     * The telephone number of the institution
     */
    phone: number;
    /**
     * The parent institution of the institution
     */
    parent_institution?: string;
    _id?: string;
};

