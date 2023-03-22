/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BioseqSet } from './BioseqSet';
import type { ProjectProfileDocument } from './ProjectProfileDocument';
import type { SubmissionReview } from './SubmissionReview';
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
export type SequenceSubmissionDocument = {
    submitted_by: (string | UserProfileDocument);
    submission_date: string;
    bioseq_set: (string | BioseqSet);
    submission_number: number;
    project: (string | ProjectProfileDocument);
    review?: SubmissionReview;
    _id?: string;
};

