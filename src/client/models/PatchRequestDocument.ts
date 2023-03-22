/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RequestState } from './RequestState';

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
export type PatchRequestDocument = {
    _id?: string;
    /**
     * The status of the role request
     */
    status?: RequestState;
};

