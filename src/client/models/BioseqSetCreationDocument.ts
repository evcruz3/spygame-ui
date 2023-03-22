/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BioseqSetCreationStatusEnum } from './BioseqSetCreationStatusEnum';
import type { BioseqSetDocument } from './BioseqSetDocument';
import type { ProjectProfileDocument } from './ProjectProfileDocument';
import type { SequenceSubmissionDocument } from './SequenceSubmissionDocument';
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
export type BioseqSetCreationDocument = {
    creation_name?: string;
    created_by: (string | UserProfileDocument);
    create_date: string;
    edited_date: string;
    edited_by: (string | UserProfileDocument);
    bioseqset?: (string | BioseqSetDocument);
    project: (string | ProjectProfileDocument);
    status: BioseqSetCreationStatusEnum;
    submissions?: (Array<string> | Array<SequenceSubmissionDocument>);
    _id?: string;
};

